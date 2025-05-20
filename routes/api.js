// routes/api.js
'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;

      // Si 'input' est manquant, FCC attend 'invalid unit' selon les tests typiques.
      if (input === undefined || input === null || String(input).trim() === '') {
         // Répondre avec une chaîne de texte et statut 200 pour 'invalid unit'
        return res.status(200).type('text').send('invalid unit');
      }

      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input); // Rappel : getUnit renvoie 'L' pour litre

      // Exigences 7, 8, 9 : Renvoyer des chaînes de texte brutes avec statut 200
      if (initNum === null && initUnit === null) {
        return res.status(200).type('text').send('invalid number and unit');
      }
      if (initNum === null) {
        return res.status(200).type('text').send('invalid number');
      }
      if (initUnit === null) {
        return res.status(200).type('text').send('invalid unit');
      }

      // Si tout est valide, procéder à la conversion
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);

      // S'assurer que returnUnit est valide avant d'appeler getString
      // Bien que getReturnUnit devrait retourner null si initUnit est invalide,
      // initUnit a déjà été validé à ce stade. Mais une double vérification ne fait pas de mal.
      if (returnUnit === null) {
          // Cela ne devrait théoriquement pas arriver si initUnit est valide
          return res.status(200).type('text').send('invalid unit');
      }
      
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      // Réponse JSON pour une conversion réussie (Exigence 11)
      res.status(200).json({
        initNum: initNum,
        initUnit: initUnit, // Sera 'L' ou en minuscules
        returnNum: returnNum,
        returnUnit: returnUnit, // Sera 'L' ou en minuscules
        string: toString
      });
    });
};