const CONVERSIONS = {
  gal: { returnUnit: 'L', factor: 3.78541, spelledOut: 'gallons' },
  L:   { returnUnit: 'gal', factor: 1 / 3.78541, spelledOut: 'liters' },
  lbs: { returnUnit: 'kg', factor: 0.453592, spelledOut: 'pounds' },
  kg:  { returnUnit: 'lbs', factor: 1 / 0.453592, spelledOut: 'kilograms' },
  mi:  { returnUnit: 'km', factor: 1.60934, spelledOut: 'miles' },
  km:  { returnUnit: 'mi', factor: 1 / 1.60934, spelledOut: 'kilometers' }
};

const validUnits = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];

function parseNumber(input) {
  const result = input.match(/^[\d/.]+/);
  if (!result) return 1;

  const numStr = result[0];
  const slashCount = (numStr.match(/\//g) || []).length;

  if (slashCount > 1) return 'invalid number';

  if (slashCount === 1) {
    const [numerator, denominator] = numStr.split('/');
    const num = parseFloat(numerator);
    const den = parseFloat(denominator);
    if (isNaN(num) || isNaN(den)) return 'invalid number';
    return num / den;
  }

  const num = parseFloat(numStr);
  return isNaN(num) ? 'invalid number' : num;
}


function parseUnit(input) {
  const unitMatch = input.match(/[a-zA-Z]+$/);
  if (!unitMatch) return 'invalid unit';

  const unit = unitMatch[0].toLowerCase();
  const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

  if (!validUnits.includes(unit)) return 'invalid unit';

  return unit === 'l' ? 'L' : unit;
}


function spellOutUnit(unit) {
  return CONVERSIONS[unit].spelledOut;
}

function convert(num, unit) {
  const conversion = CONVERSIONS[unit];
  if (!conversion) return null;
  return num * conversion.factor;
}

function getReturnUnit(initUnit) {
  return CONVERSIONS[initUnit].returnUnit;
}

function roundNum(num) {
  return Math.round(num * 100000) / 100000;
}

function convertNew(input) {
  const initNum = parseNumber(input);
  const initUnit = parseUnit(input);

if (initNum === 'invalid number' && initUnit === 'invalid unit') {
  return { error: 'invalid number and unit' };
} else if (initNum === 'invalid number') {
  return { error: 'invalid number' };
} else if (initUnit === 'invalid unit') {
  return { error: 'invalid unit' };
}


  if (numberError && unitError) {
    return { error: 'invalid number and unit' };
  } else if (numberError) {
    return { error: 'invalid number' };
  } else if (unitError) {
    return { error: 'invalid unit' };
  }

  const returnNum = roundNum(convert(initNum, initUnit));
  const returnUnit = getReturnUnit(initUnit);
  const initUnitString = spellOutUnit(initUnit);
  const returnUnitString = spellOutUnit(returnUnit);

  return {
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string: `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`
  };
}

module.exports = {
  parseNumber,
  parseUnit,
  getReturnUnit,
  spellOutUnit,
  convertNew,
  convert
};
