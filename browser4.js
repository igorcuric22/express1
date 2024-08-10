const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up storage using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'browser4.html'));
  });

// Endpoint to handle video uploads
app.post('/upload', upload.single('video'), (req, res) => {
  res.status(200).send('Video uploaded successfully');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
