const fs = require('fs');
const path = require('path');

const manifest = 'manifest.json';
const imageFolder = 'images';
const filePath = `/${imageFolder}/${manifest}`;
const directoryPath = path.join(__dirname, `/${imageFolder}`);

fs.unlink(`.${filePath}`, err => {
  if (err) {
    console.error(err);
  }

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    const imageArray = files.filter(fileName => !fileName.includes('json'));

    fs.appendFile(`./${filePath}`, JSON.stringify(imageArray), err => {
      if (err) throw err;
      console.log('Image manifest is created successfully.');
    });
  });
});

