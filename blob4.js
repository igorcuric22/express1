const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const events = require('events');

const app = express();
const port = 3000;

const videoChunks = new events.EventEmitter();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blob4.html'));
});

app.post('/upload-video', (req, res) => {
  const { chunkIndex, base64data } = req.body;

  console.log(`Received chunk ${chunkIndex}, length ${base64data.length}`);

  // Broadcast the chunk to all connected clients
  videoChunks.emit('chunk', { chunkIndex, base64data });

  res.json({ message: `Chunk ${chunkIndex} received and broadcast.` });
});

// SSE endpoint
app.get('/stream-video', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendChunk = (chunk) => {
    res.write(`data: ${JSON.stringify(chunk)}\n\n`);
  };

  videoChunks.on('chunk', sendChunk);

  req.on('close', () => {
    videoChunks.removeListener('chunk', sendChunk);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
