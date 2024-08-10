const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let chunks = [];

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'browser8.html'));
  });



app.post('/upload', (req, res) => {
    const filePath = path.join(uploadsDir, `videoox-${Date.now()}.mp4`);
    const fileStream = fs.createWriteStream(filePath);

    req.pipe(fileStream);
    
    req.on('end', () => {
        res.status(200).send('Video uploaded successfully');
    });
    req.on('error', (err) => {
        console.error('Error uploading file:', err);
        res.status(500).send('Error uploading file');
    });
});

// Endpoint to get video chunks
app.get('/chunks', (req, res) => {
    const chunk= req.body;
    chunks.push(chunk);
    res.status(200).json(chunks);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
