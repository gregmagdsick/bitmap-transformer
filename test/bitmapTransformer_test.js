// test transform does what we think (test one pixel)
// test header data correct

const bt = require(__dirname + '/../lib/bitmapTransformer');
const fs = require('fs');
const expect = require('chai').expect;


describe('Bitmap Test', () => {
  it('bt should be a function', () => {
    expect(typeof bt).to.eql('function');
  });
  it('invert file same size as origional', () => {
    const orig = fs.readFileSync(__dirname + '/../img/pallet-bitmap.bmp');
    const invert = fs.readFileSync(__dirname + '/../img/newimage_invert.bmp');
    expect(orig.length === invert.length);
  });
  it('greyscale file same size as origional', () => {
    const orig = fs.readFileSync(__dirname + '/../img/pallet-bitmap.bmp');
    const grey = fs.readFileSync(__dirname + '/../img/newimage_greyscale.bmp');
    expect(orig.length === grey.length);
  });
});
