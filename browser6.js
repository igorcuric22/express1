const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  
  ws.on('message', (message) => {
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });
  
  ws.on('close', () => {
    clients.delete(ws);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the client HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','browser6.html'));
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
