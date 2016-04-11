// 'use strict';
const fs = require('fs');
// let bitmap = fs.readFileSync(__dirname + '/duck.bmp');
var bitmap = fs.readFileSync(__dirname + '/img/pallet-bitmap.bmp');

var bitmapData = {};
bitmapData.headField = bitmap.toString('ascii', 0, 2);
bitmapData.size = bitmap.readUInt32LE(2);
bitmapData.pixelArrayStart = bitmap.readUInt32LE(10);
bitmapData.paletteColors = bitmap.readUInt32LE(46);
bitmapData.compressionMethod = bitmap.readUInt32LE(30);
bitmapData.maybeColors = bitmap.readUInt32LE(46);
bitmapData.height = bitmap.readUInt32LE(22);
bitmapData.width = bitmap.readUInt32LE(18);
bitmapData.bpp = bitmap.readUInt32LE(28);
bitmapData.theSize = bitmap.readUInt32LE(34);
bitmapData.vip = bitmap.readUInt32LE(54);

console.dir(bitmapData);
console.log(bitmap.readUInt32LE(2));
var colors = {};
colors.getTheColors = function() {

  for (var i = 54; i < 70; i++) {
    console.log('colors: ' + bitmap[i]);
  }
  // console.log('Color: ' + bitmap[54]);
};


colors.alterColors = function() {
  var x = bitmap[54];
  console.log('var x: ' + x);
    // var x = bitmap[90];
  for (var i = 54; i < bitmapData.pixelArrayStart; i = i + 4) {
    var aVal = bitmap.readUInt8(i);
    var bVal = bitmap.readUInt8(i + 1);
    var gVal = bitmap.readUInt8(i + 2);
    var rVal = bitmap.readUInt8(i + 3);

    bitmap.writeUInt8(-(aVal - 255), i);
    bitmap.writeUInt8(-(bVal - 255), i + 1);
    bitmap.writeUInt8(-(gVal - 255), i + 2);
    bitmap.writeUInt8(-(rVal - 255), i + 3);
  }

  return bitmap;
};


colors.alterColors();

var date = new Date();

fs.writeFile('img/newimage' + date + '.bmp', bitmap, (err) => {
  if (err) throw err;
  console.log('done');
});
