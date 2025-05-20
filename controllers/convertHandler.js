function ConvertHandler() {
  // ... (vos autres méthodes : getNum, getUnit, getReturnUnit, convert) ...

  this.spellOutUnit = function (unit) {
    const unitLower = unit.toLowerCase();
    switch (unitLower) {
      case 'gal': return 'gallons';
      case 'l': return 'litres'; // Assurez-vous que c'est 'litres' et non 'liter' si FCC l'attend
      case 'lbs': return 'pounds';
      case 'kg': return 'kilograms';
      case 'mi': return 'miles';
      case 'km': return 'kilometers'; // Assurez-vous que c'est 'kilometers' et non 'kilomete...'
      default: return null; // ou une chaîne d'erreur appropriée si nécessaire
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitStr = this.spellOutUnit(initUnit);
    const returnUnitStr = this.spellOutUnit(returnUnit);

    // Si l'une des unités épelées est nulle (parce que l'unité d'entrée/retour était invalide en premier lieu),
    // cela ne devrait pas arriver ici si les vérifications précédentes sont correctes,
    // mais par sécurité :
    if (!initUnitStr || !returnUnitStr) {
        // Cette situation ne devrait pas se produire si initUnit et returnUnit sont valides
        // au moment où cette fonction est appelée.
        // Normalement, les erreurs d'unité sont interceptées plus tôt.
        return "Error in spelling out units"; // Ou null, selon la gestion d'erreur souhaitée
    }

    // C'EST LA LIGNE CRUCIALE POUR L'ERREUR DE LANGUE
    return `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;
  };
}

module.exports = ConvertHandler;