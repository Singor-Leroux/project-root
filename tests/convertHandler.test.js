// convertHandler.test.js

const {
  parseNumber,
  parseUnit,
  getReturnUnit,
  spellOutUnit,
  convert,
} = require('../controllers/convertHandler');

describe('Convert Handler', () => {

  describe('parseNumber', () => {
    test('should parse whole number', () => {
      expect(parseNumber('32L')).toBe(32);
    });

    test('should parse decimal number', () => {
      expect(parseNumber('3.1mi')).toBeCloseTo(3.1, 5);
    });

    test('should parse fractional input', () => {
      expect(parseNumber('1/2km')).toBeCloseTo(0.5, 5);
    });

    test('should parse fractional with decimal', () => {
      expect(parseNumber('4.5/3kg')).toBeCloseTo(1.5, 5);
    });

    test('should return error on double fraction', () => {
      expect(parseNumber('3/2/3kg')).toBe('invalid number');
    });

    test('should default to 1 if no number', () => {
      expect(parseNumber('kg')).toBe(1);
    });
  });

  describe('parseUnit', () => {
    test('should recognize valid input units', () => {
      const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      inputUnits.forEach(unit => {
        expect(parseUnit(`3${unit}`)).toBe(unit === 'l' ? 'L' : unit);
      });
    });

    test('should be case-insensitive', () => {
      expect(parseUnit('5l')).toBe('L');
      expect(parseUnit('5KM')).toBe('km');
    });

    test('should return error for invalid unit', () => {
      expect(parseUnit('32g')).toBe('invalid unit');
    });
  });

  describe('getReturnUnit', () => {
    test('should return correct conversion unit', () => {
      const pairs = {
        gal: 'L',
        L: 'gal',
        mi: 'km',
        km: 'mi',
        lbs: 'kg',
        kg: 'lbs',
      };
      Object.entries(pairs).forEach(([input, expected]) => {
        expect(getReturnUnit(input)).toBe(expected);
      });
    });
  });

  describe('spellOutUnit', () => {
    test('should return full unit name', () => {
      const unitNames = {
        gal: 'gallons',
        L: 'liters',
        mi: 'miles',
        km: 'kilometers',
        lbs: 'pounds',
        kg: 'kilograms',
      };
      Object.entries(unitNames).forEach(([unit, name]) => {
        expect(spellOutUnit(unit)).toBe(name);
      });
    });
  });

  describe('convert', () => {
    test('should correctly convert gal to L', () => {
      expect(convert(1, 'gal')).toBeCloseTo(3.78541, 5);
    });

    test('should correctly convert L to gal', () => {
      expect(convert(1, 'L')).toBeCloseTo(1 / 3.78541, 5);
    });

    test('should correctly convert mi to km', () => {
      expect(convert(1, 'mi')).toBeCloseTo(1.60934, 5);
    });

    test('should correctly convert km to mi', () => {
      expect(convert(1, 'km')).toBeCloseTo(1 / 1.60934, 5);
    });

    test('should correctly convert lbs to kg', () => {
      expect(convert(1, 'lbs')).toBeCloseTo(0.453592, 5);
    });

    test('should correctly convert kg to lbs', () => {
      expect(convert(1, 'kg')).toBeCloseTo(1 / 0.453592, 5);
    });
  });

});
