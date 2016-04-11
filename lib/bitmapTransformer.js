'use strict';
const fs = require('fs');
let date = new Date();

let bmp = fs.readFileSync(__dirname + '/../img/' + process.argv[2]);
let transformType = process.argv[3];
let bmpHeader = {};

bmpHeader.raw = bmp.toString('ascii', 0, 2);
bmpHeader.size = bmp.readUInt32LE(2);
bmpHeader.pixelStart = bmp.readUInt32LE(10);
bmpHeader.palletSize = bmp.readUInt32LE(46);
bmpHeader.compression = bmp.readUInt32LE(30);

const transform = function(conversion) {
  if (conversion === 'invert') {
      for (var i = 54; i < bmpHeader.pixelStart; i = i + 4) {
        var bVal = bmp.readUInt8(i);
        var gVal = bmp.readUInt8(i + 1);
        var rVal = bmp.readUInt8(i + 2);
        var aVal = bmp.readUInt8(i + 3);

        bmp.writeUInt8(-(bVal - 255), i);
        bmp.writeUInt8(-(gVal - 255), i + 1);
        bmp.writeUInt8(-(rVal - 255), i + 2);
        bmp.writeUInt8(-(aVal - 255), i + 3);
      }

      return bmp;
    } else if (conversion === 'greyscale') {
      for (i = 54; i < bmpHeader.pixelStart; i = i + 4) {
        bVal = bmp.readUInt8(i);
        gVal = bmp.readUInt8(i + 1);
        rVal = bmp.readUInt8(i + 2);
        aVal = bmp.readUInt8(i + 3);

        var avgVal = (bVal + gVal + rVal) / 3;

        bmp.writeUInt8(avgVal, i);
        bmp.writeUInt8(avgVal, i + 1);
        bmp.writeUInt8(avgVal, i + 2);
        bmp.writeUInt8(avgVal, i + 3);
      }
    }
    return 'error, invalid transformType';
  };

transform(transformType);

fs.writeFile('img/newimage' + date + '.bmp', bmp, (err) => {
  if (err) throw err;
  console.log('done');
});
