'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;
      if (!input) {
        return res.json({ error: 'invalid unit' }); // Ou 'invalid input' selon la préférence
      }

      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      if (initNum === null && initUnit === null) {
        return res.json({ error: 'invalid number and unit' });
      }
      if (initNum === null) {
        return res.json({ error: 'invalid number' });
      }
      if (initUnit === null) {
        return res.json({ error: 'invalid unit' });
      }

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