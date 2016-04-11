// 'use strict';
const fs = require('fs');
// let bitmap = fs.readFileSync(__dirname + '/duck.bmp');
var bitmap = fs.readFileSync(__dirname + '/img/pallet-bitmap.bmp');

var bitmapData = {};
bitmapData.headField = bitmap.toString('ascii',0,2);
bitmapData.size = bitmap.readUInt32LE(2);
bitmapData.pixelArrayStart = bitmap.readUInt32LE(10);
bitmapData.paletteColors = bitmap.readUInt32LE(46);
bitmapData.compressionMethod = bitmap.readUInt32LE(30);
bitmapData.maybeColors = bitmap.readUInt32LE(46);
bitmapData.height = bitmap.readUInt32LE(22);
bitmapData.width = bitmap.readUInt32LE(18);
bitmapData.bpp = bitmap.readUInt32LE(28);
bitmapData.theSize= bitmap.readUInt32LE(34);
bitmapData.vip = bitmap.readUInt32LE(54);

console.dir(bitmapData);
console.log(bitmap.readUInt32LE(2));
var colors ={};
colors.getTheColors = function(){

  for (var i = 54; i < 70; i++){
    console.log('colors: ' + bitmap[i]);
  };
  // console.log('Color: ' + bitmap[54]);
};


colors.alterColors = function(){
  var x = bitmap[54];
  console.log('var x: ' + x);
    // var x = bitmap[90];
  for (var i = 54; i < bitmapData.pixelArrayStart; i = i + 4) {
    aVal = bitmap.readUInt8(i);
    bVal = bitmap.readUInt8(i + 1);
    gVal = bitmap.readUInt8(i + 2);
    rVal = bitmap.readUInt8(i + 3);

    bitmap.write((-(aVal-255)).toString(), i);
    bitmap.write((-(bVal-255)).toString(), i + 1);
    bitmap.write((-(gVal-255)).toString(), i + 2);
    bitmap.write((-(rVal-255)).toString(), i + 3);

  };

  return bitmap;
};

// colors.getTheColors();
// colors.alterColors();

colors.changeTheColors = function(){
// 90 = green streak; // 54 = blue;// 55 = green; // 56 =red;

  for(var i = 55;i<60; i + 4){
    // if i =
    // bitmap.writeUInt32LE(255, 54);
    // bitmap.writeUInt32LE(255, i);
    // bitmap.writeUInt32LE(0, i+1);
    // bitmap.writeUInt32LE(255, i+2);

    console.log('break');
    colors.getTheColors();
    colors.alterColors();
    colors.getTheColors();
    return(bitmap);
  };

};

colors.changeTheColors();

// colors.alterColors();

var date = new Date();

fs.writeFile('img/newimage' + date + '.bmp', bitmap, (err)=>{
  if (err) throw err;
  console.log('done');
});
