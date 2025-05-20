// routes/api.js
'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;

      // Gérer le cas où 'input' est absent ou vide
      // FreeCodeCamp teste probablement cela.
      if (input === undefined || input === null || String(input).trim() === '') {
        // Selon l'exigence 7, si l'unité n'est pas valide (ce qui est le cas si l'input est vide),
        // renvoyer 'invalid unit'.
        return res.status(200).type('text').send('invalid unit');
      }

      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input); // Rappel : getUnit renvoie 'L' pour litre

      // L'ordre des vérifications est important pour correspondre aux messages d'erreur spécifiques.
      if (initNum === null && initUnit === null) {
        // Exigence 9
        return res.status(200).type('text').send('invalid number and unit');
      }
      if (initNum === null) {
        // Exigence 8
        return res.status(200).type('text').send('invalid number');
      }
      if (initUnit === null) {
        // Exigence 7
        return res.status(200).type('text').send('invalid unit');
      }

      // Si toutes les validations d'entrée sont passées, procéder à la conversion
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      // Construction de la réponse JSON pour une conversion réussie
      res.status(200).json({
        initNum: initNum,
        initUnit: initUnit, // Doit être en minuscule, sauf 'L'
        returnNum: returnNum,
        returnUnit: returnUnit, // Doit être en minuscule, sauf 'L'
        string: toString
      });
    });
};