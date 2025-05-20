const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server'); // Assurez-vous que server.js exporte l'application

chai.use(chaiHttp);

suite('Functional Tests', function () {

  suite('Routing Tests', function () {

    suite('GET /api/convert => conversion object', function () {

      test('Convert 10L (valid input)', function (done) {
        chai.request(server)
          .get('/api/convert')
          .query({ input: '10L' })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, 'L');
            assert.approximately(res.body.returnNum, 2.64172, 0.00001);
            assert.equal(res.body.returnUnit, 'gal');
            assert.equal(res.body.string, '10 litres convertit en 2.64172 gallons');
            done();
          });
      });

test('Convert 32g (invalid input unit)', function (done) {
  chai.request(server)
    .get('/api/convert')
    .query({ input: '32g' })
    .end(function (err, res) {
      assert.equal(res.status, 200); // FCC s'attend souvent à 200 même pour les erreurs d'application
      // assert.deepEqual(res.body, { error: 'invalid unit' }); // ANCIENNE VERSION si vous renvoyiez JSON
      assert.equal(res.text, 'invalid unit'); // NOUVELLE VERSION pour correspondre à res.send('invalid unit')
      done();
    });
});

test('Convert 3/7.2/4kg (invalid number)', function (done) {
  chai.request(server)
    .get('/api/convert')
    .query({ input: '3/7.2/4kg' })
    .end(function (err, res) {
      assert.equal(res.status, 200);
      // assert.deepEqual(res.body, { error: 'invalid number' }); // ANCIENNE VERSION
      assert.equal(res.text, 'invalid number'); // NOUVELLE VERSION
      done();
    });
});

test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function (done) {
  chai.request(server)
    .get('/api/convert')
    .query({ input: '3/7.2/4kilomegagram' })
    .end(function (err, res) {
      assert.equal(res.status, 200);
      // assert.deepEqual(res.body, { error: 'invalid number and unit' }); // ANCIENNE VERSION
      assert.equal(res.text, 'invalid number and unit'); // NOUVELLE VERSION
      done();
    });
});

      test('Convert kg (no number)', function (done) {
        chai.request(server)
          .get('/api/convert')
          .query({ input: 'kg' })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'kg');
            assert.approximately(res.body.returnNum, 2.20462, 0.00001);
            assert.equal(res.body.returnUnit, 'lbs');
            assert.equal(res.body.string, '1 kilograms convertit en 2.20462 pounds');
            done();
          });
      });

    });

  });

});