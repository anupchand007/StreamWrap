const Jimp = require('jimp');
const fs = require('fs');
const pngToIco = require('png-to-ico');

console.log('Reading image (JPEG)...');
Jimp.read('icon.png')
  .then(image => {
    console.log('Resizing to 256x256 and saving as true PNG...');
    return image.resize(256, 256).writeAsync('real_icon.png');
  })
  .then(() => {
    console.log('Converting true PNG to ICO...');
    return pngToIco('real_icon.png');
  })
  .then(buf => {
    fs.writeFileSync('icon.ico', buf);
    console.log('Successfully created valid icon.ico');
  })
  .catch(err => {
    console.error('Error during conversion:', err);
  });
