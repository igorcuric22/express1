const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'web6.html'));
});

// Route to stream the MP4 video file
app.get('/stream-video', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'igor.mp4');

    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error('Error getting file stats:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const fileSize = stats.size;
        const CHUNK_SIZE = 1024; // 1KB chunks
        let start = 0;

        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Length', fileSize);

        const readChunk = () => {
            if (start >= fileSize) {
                res.end();
                return;
            }

            const end = Math.min(start + CHUNK_SIZE, fileSize);
            const chunkSize = end - start; // Actual size of the current chunk
            const buffer = Buffer.alloc(chunkSize);

            fs.open(filePath, 'r', (err, fd) => {
                if (err) {
                    console.error('Error opening file:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                fs.read(fd, buffer, 0, chunkSize, start, (err, bytesRead) => {
                    if (err) {
                        console.error('Error reading file:', err);
                        res.status(500).send('Internal Server Error');
                        fs.close(fd, () => {});
                        return;
                    }

                    const chunk = buffer.slice(0, bytesRead);
                    res.write(chunk);
                    start += bytesRead;

                    fs.close(fd, (err) => {
                        if (err) {
                            console.error('Error closing file:', err);
                            res.status(500).send('Internal Server Error');
                            return;
                        }

                        // Read the next chunk
                        setImmediate(readChunk);
                    });
                });
            });
        };

        readChunk();
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
