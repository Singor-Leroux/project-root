function ConvertHandler() {

  this.getNum = function (input) {
    let num;
    // Trouve l'index du premier caractère alphabétique
    const firstCharIndex = input.search(/[a-zA-Z]/);
    let numStr = (firstCharIndex === -1) ? input : input.substring(0, firstCharIndex);

    if (numStr === "") {
      return 1; // Par défaut à 1 si aucun nombre n'est fourni
    }

    // Gérer les fractions
    if (numStr.includes('/')) {
      const parts = numStr.split('/');
      if (parts.length > 2) {
        return null; // Double fraction invalide
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
      return null; // Aucune unité trouvée
    }
    let unitStr = input.substring(firstCharIndex).toLowerCase();

    if (unitStr === 'l') {
        return 'L'; // Litre doit être en majuscule 'L'
    }

    return validUnits.includes(unitStr) ? unitStr : null;
  };

  this.getReturnUnit = function (initUnit) {
    const unit = initUnit.toLowerCase();
    switch (unit) {
      case 'gal': return 'L';
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
      case 'l': return 'litres';
      case 'lbs': return 'pounds';
      case 'kg': return 'kilograms';
      case 'mi': return 'miles';
      case 'km': return 'kilometers';
      default: return null;
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
    // Arrondir à 5 décimales
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitStr = this.spellOutUnit(initUnit);
    const returnUnitStr = this.spellOutUnit(returnUnit);
    if (!initUnitStr || !returnUnitStr) return null; // Si une unité n'est pas valide
    return `${initNum} ${initUnitStr} convertit en ${returnNum} ${returnUnitStr}`;
  };

}

module.exports = ConvertHandler;