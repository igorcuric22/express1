const fs = require('fs');

const filePath = 'public/sample.txt';
const chunkSize = 16;
let buffer = Buffer.alloc(chunkSize);

// Open a file for reading
fs.open(filePath, 'r', (err, fd) => {
  if (err) {
    console.error('Error opening file:', err);
    return;
  }

  function readChunk(position) {
    fs.read(fd, buffer, 0, chunkSize, position, (err, bytesRead, data) => {
      if (err) {
        console.error('Error reading file:', err);
        fs.close(fd, () => {
          console.log('File closed successfully.');
        });
        return;
      }

      if (bytesRead > 0) {
        console.log(`Read ${bytesRead} bytes: ${data.toString()}`);
        readChunk(position + bytesRead);
      } else {
        // No more bytes to read, close the file
        fs.close(fd, (err) => {
          if (err) {
            console.error('Error closing file:', err);
          } else {
            console.log('File closed successfully.');
          }
        });
      }
    });
  }

  // Start reading from the beginning of the file
  readChunk(0);
});
