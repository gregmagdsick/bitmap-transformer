'use strict';
const fs = require('fs');

let transformType = process.argv[3] || 'greyscale';

const transform = module.exports = exports = function(conversion) {
  let bmp = fs.readFileSync(__dirname + '/../img/' + (process.argv[2] || 'pallet-bitmap.bmp'));
  let bmpHeader = {};

  bmpHeader.raw = bmp.toString('ascii', 0, 2);
  bmpHeader.size = bmp.readUInt32LE(2);
  bmpHeader.pixelStart = bmp.readUInt32LE(10);
  bmpHeader.palletSize = bmp.readUInt32LE(46);
  bmpHeader.compression = bmp.readUInt32LE(30);
  if (conversion === 'invert') {
      for (var i = 54; i < bmpHeader.pixelStart; i = i + 4) {
        var bVal = bmp.readUInt8(i);
        var gVal = bmp.readUInt8(i + 1);
        var rVal = bmp.readUInt8(i + 2);
        var aVal = bmp.readUInt8(i + 3);

        bmp.writeUInt8(255 - bVal, i);
        bmp.writeUInt8(255 - gVal, i + 1);
        bmp.writeUInt8(255 - rVal, i + 2);
        bmp.writeUInt8(255 - aVal, i + 3);
      }
      fs.writeFile('img/newimage_' + transformType + '.bmp', bmp, (err) => {
        if (err) throw err;
      });
      return process.stdout.write('done\n');
    } else if (conversion === 'greyscale') {
      for (i = 54; i < bmpHeader.pixelStart; i = i + 4) {
        bVal = bmp.readUInt8(i);
        gVal = bmp.readUInt8(i + 1);
        rVal = bmp.readUInt8(i + 2);

        var avgVal = (bVal + gVal + rVal) / 3;

        bmp.writeUInt8(avgVal, i);
        bmp.writeUInt8(avgVal, i + 1);
        bmp.writeUInt8(avgVal, i + 2);
        bmp.writeUInt8(avgVal, i + 3);
      }
      fs.writeFile('img/newimage_' + transformType + '.bmp', bmp, (err) => {
        if (err) throw err;
      });
      return process.stdout.write('done\n');
    }
    process.stdout.write('error, invalid transformType\n');
  };

  transform(transformType);
