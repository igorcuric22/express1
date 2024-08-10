const fs = require('fs');

const filePath = 'public/sample.txt';
const chunkSize = 16;

// Create a readable stream
const readable = fs.createReadStream(filePath, {
  highWaterMark: chunkSize, // Specify the chunk size
  encoding: 'utf8' // Specify encoding if you want strings instead of buffers
});

// Event listeners for the stream
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data:`, chunk);
});

readable.on('error', (err) => {
  console.error('Error reading the file:', err);
});

readable.on('end', () => {
  console.log('Finished reading the file.');
});
