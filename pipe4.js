const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'web3.html'));
});

// Route to stream the text file
app.get('/read-file', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'sample.txt');

    // Get file stats (to determine file size)
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error('Error getting file stats:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Set headers
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', stats.size);
        console.log(stats.size);

        // Create read stream
        const readStream = fs.createReadStream(filePath);

        // Handle stream events
        readStream.on('open', () => {
            readStream.pipe(res);
        });

        readStream.on('error', (err) => {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
