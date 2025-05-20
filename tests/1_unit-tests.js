const chai = require('chai');
const assert = chai.assert;
const convertHandler = require('../controllers/convertHandler');

suite('Unit Tests', () => {
  test('convertHandler should read correctly a whole number input', () => {
    const input = '32L';
    const result = convertHandler.convert(input);
    assert.equal(result.initNum, 32);
  });

  test('convertHandler should read correctly a decimal number input', () => {
    const input = '3.1mi';
    const result = convertHandler.convert(input);
    assert.equal(result.initNum, 3.1);
  });

  test('convertHandler should read correctly a fractional input', () => {
    const input = '1/2kg';
    const result = convertHandler.convert(input);
    assert.equal(result.initNum, 0.5);
  });

  test('convertHandler should read correctly a fractional input with a decimal', () => {
    const input = '2.5/5km';
    const result = convertHandler.convert(input);
    assert.equal(result.initNum, 0.5);
  });

  test('convertHandler should correctly return error on double fraction', () => {
    const input = '3/2/3mi';
    const result = convertHandler.convert(input);
    assert.equal(result.error, 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', () => {
    const input = 'kg';
    const result = convertHandler.convert(input);
    assert.equal(result.initNum, 1);
  });

  test('convertHandler should correctly read each valid input unit', () => {
    const inputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    inputs.forEach(unit => {
      const result = convertHandler.convert('1' + unit);
      assert.equal(result.initUnit, unit === 'L' ? 'L' : unit.toLowerCase());
    });
  });

  test('convertHandler should correctly return error for invalid input unit', () => {
    const input = '32g';
    const result = convertHandler.convert(input);
    assert.equal(result.error, 'invalid unit');
  });

  test('convertHandler should return correct return unit for each valid input unit', () => {
    const inputToReturn = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    Object.entries(inputToReturn).forEach(([inputUnit, returnUnit]) => {
      const result = convertHandler.convert('1' + inputUnit);
      assert.equal(result.returnUnit, returnUnit);
    });
  });

  test('convertHandler should return spelled-out unit string for each valid input unit', () => {
    const inputToSpelled = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    Object.entries(inputToSpelled).forEach(([inputUnit, spelled]) => {
      const result = convertHandler.convert('1' + inputUnit);
      assert.include(result.string, spelled);
    });
  });

  test('convertHandler should correctly convert gal to L', () => {
    const result = convertHandler.convert('5gal');
    assert.approximately(result.returnNum, 18.92705, 0.1);
  });

  test('convertHandler should correctly convert L to gal', () => {
    const result = convertHandler.convert('5L');
    assert.approximately(result.returnNum, 1.32086, 0.1);
  });

  test('convertHandler should correctly convert mi to km', () => {
    const result = convertHandler.convert('3mi');
    assert.approximately(result.returnNum, 4.82802, 0.1);
  });

  test('convertHandler should correctly convert km to mi', () => {
    const result = convertHandler.convert('3km');
    assert.approximately(result.returnNum, 1.86411, 0.1);
  });

  test('convertHandler should correctly convert lbs to kg', () => {
    const result = convertHandler.convert('10lbs');
    assert.approximately(result.returnNum, 4.53592, 0.1);
  });

  test('convertHandler should correctly convert kg to lbs', () => {
    const result = convertHandler.convert('10kg');
    assert.approximately(result.returnNum, 22.0462, 0.1);
  });
});
