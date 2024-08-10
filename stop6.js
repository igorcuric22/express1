const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;  // Use the specified port or default to 3000

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'media')));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
