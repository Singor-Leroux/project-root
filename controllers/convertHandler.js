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
  // Récupère la partie nombre (avant la première lettre)
  let numStr = input.match(/^[\d/.]+/)?.[0];
  if (!numStr) return 1; // Si pas de nombre donné, par défaut 1

  // Vérifie s'il y a plusieurs '/'
  if ((numStr.match(/\//g) || []).length > 1) return null;

  if (numStr.includes('/')) {
    // Fraction
    const numbers = numStr.split('/');
    if (numbers.length !== 2) return null;
    const [numerator, denominator] = numbers;
    if (isNaN(numerator) || isNaN(denominator)) return null;
    return parseFloat(numerator) / parseFloat(denominator);
  } else {
    // Décimal ou entier
    const parsed = parseFloat(numStr);
    if (isNaN(parsed)) return null;
    return parsed;
  }
}

function parseUnit(input) {
  const unitMatch = input.match(/[a-zA-Z]+$/);
  if (!unitMatch) return null;
  let unit = unitMatch[0];
  if (unit.toLowerCase() === 'l') unit = 'L'; // Majuscule litre
  else unit = unit.toLowerCase();

  if (!validUnits.includes(unit)) return null;
  return unit;
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

function convert(input) {
  const initNum = parseNumber(input);
  const initUnit = parseUnit(input);

  const numberError = initNum === null;
  const unitError = initUnit === null;

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
  convert
};
