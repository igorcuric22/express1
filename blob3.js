const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const chunkIndex = req.body.chunkIndex;
    cb(null, `chunk_${chunkIndex}.webm`);
  }
});

const upload = multer({ storage: storage });

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blob3.html'));
});

// POST route to receive video chunks
app.post('/upload-video', upload.single('videoChunk'), (req, res) => {
  const chunkIndex = req.body.chunkIndex;

  console.log(`Chunk ${chunkIndex} saved successfully: ${req.file.path}`);
  res.json({ message: `Chunk ${chunkIndex} received and saved.` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
