const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blob2.html'));
});

// POST route to receive video file
app.post('/upload-video', (req, res) => {
  let data = '';
  
  // Handle incoming data stream
  req.on('data', chunk => {
    data += chunk;
  });

  // Process end of data stream
  req.on('end', () => {
    const base64data = data.replace(/^data:.*,/, '');
    const buffer = Buffer.from(base64data, 'base64');

    // Example: Save buffer to a file
    const filePath = path.join(__dirname, 'uploads', `video_${Date.now()}.mp4`);
    fs.writeFile(filePath, buffer, err => {
      if (err) {
        console.error('Error saving file:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Video saved successfully:', filePath);
        res.send('Video uploaded successfully!');
      }
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

