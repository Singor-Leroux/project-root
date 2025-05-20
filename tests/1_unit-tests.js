const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  suite('Function convertHandler.getNum(input)', function () {
    test('Whole number input', function (done) {
      assert.equal(convertHandler.getNum('32L'), 32);
      done();
    });

    test('Decimal Input', function (done) {
      assert.equal(convertHandler.getNum('3.2L'), 3.2);
      done();
    });

    test('Fractional Input', function (done) {
      assert.equal(convertHandler.getNum('1/2L'), 0.5);
      done();
    });

    test('Fractional Input w/ Decimal', function (done) {
      assert.equal(convertHandler.getNum('5.4/2L'), 2.7);
      assert.equal(convertHandler.getNum('5/2.5L'), 2);
      done();
    });

    test('Invalid Input (double fraction)', function (done) {
      assert.isNull(convertHandler.getNum('3/2/3L'));
      done();
    });

    test('No Numerical Input', function (done) {
      assert.equal(convertHandler.getNum('L'), 1);
      assert.equal(convertHandler.getNum('kg'), 1);
      done();
    });
  });

  suite('Function convertHandler.getUnit(input)', function () {
    test('For Each Valid Unit Inputs', function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      const output = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getUnit(ele), output[i]);
        assert.equal(convertHandler.getUnit('10' + ele), output[i]);
      });
      done();
    });

    test('Unknown Unit Input', function (done) {
      assert.isNull(convertHandler.getUnit('32g'));
      assert.isNull(convertHandler.getUnit('min'));
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function () {
    test('For Each Valid Unit Inputs', function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function () {
    test('For Each Valid Unit Inputs', function (done) {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['gallons', 'litres', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function () {
    test('Gal to L', function (done) {
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
      done();
    });

    test('L to Gal', function (done) {
      assert.approximately(convertHandler.convert(1, 'L'), 1 / 3.78541, 0.00001);
      done();
    });

    test('Mi to Km', function (done) {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
      done();
    });

    test('Km to Mi', function (done) {
      assert.approximately(convertHandler.convert(1, 'km'), 1 / 1.60934, 0.00001);
      done();
    });

    test('Lbs to Kg', function (done) {
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.00001);
      done();
    });

    test('Kg to Lbs', function (done) {
      assert.approximately(convertHandler.convert(1, 'kg'), 1 / 0.453592, 0.00001);
      done();
    });
  });

});