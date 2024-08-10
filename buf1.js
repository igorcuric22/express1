const fs = require('fs');

// Open a file for reading
fs.open('public/sample.txt', 'r', (err, fd) => {
  if (err) {
    console.error('Error opening file:', err);
    return;
  }

  // Buffer to store data read from the file
  let buffer = Buffer.alloc(16); // Allocate a buffer of size 1024 bytes

  // Read data from the file
  fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead, data) => {
    if (err) {
      console.error('Error reading file:', err);
      fs.close(fd, () => {
        console.log('File closed successfully.');
      });
      return;
    }

    // Print out the data read from the file
    console.log(`Bytes read: ${bytesRead}`);
    console.log(`Data read: ${data.slice(0, bytesRead).toString()}`);

    // Close the file once we're done with it
    fs.close(fd, (err) => {
      if (err) {
        console.error('Error closing file:', err);
      } else {
        console.log('File closed successfully.');
      }
    });
  });
});
