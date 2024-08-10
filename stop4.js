const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stop2.html'));
});

// Route to serve the video file manually
app.get('/media/videox1.mp4', (req, res) => {
    const filePath = path.join(__dirname, 'media', 'videox1.mp4');
    fs.stat(filePath, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 404 Error if file not found
                return res.sendStatus(404);
            }
            res.end(err);
        }

        const range = req.headers.range;
        if (!range) {
            // 416 Wrong range
            res.status(416).send('Range not specified');
            return;
        }

        const positions = range.replace(/bytes=/, "").split("-");
        const start = parseInt(positions[0], 10);
        const file_size = stats.size;
        const end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;
        const chunksize = (end - start) + 1;

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${file_size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        });

        const stream = fs.createReadStream(filePath, { start, end })
            .on('open', () => stream.pipe(res))
            .on('error', (err) => res.end(err));
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
