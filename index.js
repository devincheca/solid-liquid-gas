const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size')

const manifest = 'manifest.json';
// const imageFolder = 'digital';
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

    const imageArray = files
      .filter(fileName => !fileName.includes('json'))
      .map(fileName => {
        const { height, width } = sizeOf(`${imageFolder}/${fileName}`);
        return {
          fileName,
          height,
          width,
          isNewLine: width > 1.5 * height,
        };
      });

    fs.appendFile(`./${filePath}`, JSON.stringify(imageArray), err => {
      if (err) throw err;
      console.log('Image manifest is created successfully.');
    });
  });
});

