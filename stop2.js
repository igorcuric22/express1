const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to serve media files from the "media" directory
app.use('/media', express.static(path.join(__dirname, 'media')));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
