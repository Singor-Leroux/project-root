// routes/api.js
'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;
      if (!input) {
        // FCC attend probablement une chaîne simple ici, basée sur l'exigence 7
        // return res.json({ error: 'invalid unit' });
        return res.type('text').send('invalid unit'); // Ou juste res.send('invalid unit');
      }

      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      // L'ordre des vérifications est important
      if (initNum === null && initUnit === null) {
        // return res.json({ error: 'invalid number and unit' });
        return res.type('text').send('invalid number and unit'); // Exigence 9
      }
      if (initNum === null) {
        // return res.json({ error: 'invalid number' });
        return res.type('text').send('invalid number'); // Exigence 8
      }
      if (initUnit === null) {
        // return res.json({ error: 'invalid unit' });
        return res.type('text').send('invalid unit'); // Exigence 7
      }

      // Si tout est valide, on continue avec la réponse JSON
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      });
    });
};