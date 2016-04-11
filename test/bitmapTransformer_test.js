const BT = require(__dirname + '/../lib/bitmapTransformer');
const expect = require('chai').expect;


describe('Bitmap Test', () => {
  it('breaking test', () => {
    expect(true === false);
  });
  it('bt should be an object', () => {
    var bt = new BT('invert');
    expect(typeof bt).to.eql('object');
  });
});
