const BT = require(__dirname + '/../lib/bitmapTransformer');
const expect = require('chai').expect;


describe('Bitmap Length Test', () => {
  it('breaking test', () => {
    expect(true === false);
  });
  it('invert length is same as original', () => {
    var bt = new BT('invert');
    expect(bt.length).to.eql(BT.length);
  });
});
