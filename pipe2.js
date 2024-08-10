const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const port = 3000;

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'web3.html'));
});

// Route to read and send the text file
app.get('/read-file', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'public', 'sample.txt');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        
        res.setHeader('Content-Type', 'text/plain');
        res.send(fileContent);
    } catch (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
