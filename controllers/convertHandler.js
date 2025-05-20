// controllers/convertHandler.js

function ConvertHandler() {

  this.getNum = function (input) {
    let num;
    const firstCharIndex = input.search(/[a-zA-Z]/);
    let numStr = (firstCharIndex === -1) ? input : input.substring(0, firstCharIndex);

    if (numStr === "") {
      return 1;
    }

    if (numStr.includes('/')) {
      const parts = numStr.split('/');
      if (parts.length > 2) {
        return null; // Double fraction
      }
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return null; // Fraction invalide
      }
      num = numerator / denominator;
    } else {
      num = parseFloat(numStr);
    }

    return isNaN(num) ? null : num;
  };

  this.getUnit = function (input) {
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const firstCharIndex = input.search(/[a-zA-Z]/);
    if (firstCharIndex === -1) {
      return null;
    }
    let unitStr = input.substring(firstCharIndex).toLowerCase();

    if (unitStr === 'l') {
      return 'L'; // Exigence FCC : Litre en majuscule 'L'
    }

    return validUnits.includes(unitStr) ? unitStr : null;
  };

  this.getReturnUnit = function (initUnit) {
    const unit = initUnit.toLowerCase(); // Toujours comparer en minuscules
    switch (unit) {
      case 'gal': return 'L';    // Exigence FCC : Litre retourné en 'L'
      case 'l': return 'gal';
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
      case 'mi': return 'km';
      case 'km': return 'mi';
      default: return null;
    }
  };

  this.spellOutUnit = function (unit) {
    const unitLower = unit.toLowerCase();
    switch (unitLower) {
      case 'gal': return 'gallons';
      case 'l': return 'litres';        // Orthographe anglaise correcte
      case 'lbs': return 'pounds';
      case 'kg': return 'kilograms';     // Orthographe anglaise correcte
      case 'mi': return 'miles';
      case 'km': return 'kilometers';   // Orthographe anglaise correcte et complète
      default: return 'unknown unit'; // Sécurité, ne devrait pas être atteint si la logique est correcte
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    const unit = initUnit.toLowerCase();

    switch (unit) {
      case 'gal': result = initNum * galToL; break;
      case 'l': result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
      default: return null;
    }
    return parseFloat(result.toFixed(5)); // Arrondi à 5 décimales
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitStr = this.spellOutUnit(initUnit);
    const returnUnitStr = this.spellOutUnit(returnUnit);

    // !! CORRECTION CRUCIALE POUR LA LANGUE ET L'ORTHOGRAPHE !!
    return `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;
  };

}

module.exports = ConvertHandler;