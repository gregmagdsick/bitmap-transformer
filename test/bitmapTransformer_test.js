const BT = require(__dirname + '/../lib/bitmapTransformer');
const expect = require('chai').expect;

var bt = new BT();

describe('Bitmap Length Test', () => {
  it('breaking test', () => {
    expect(true === false);
  });
  it('invert length is same as original', () => {
    expect(bt.length).to.eql(BT.length);
  });
});
