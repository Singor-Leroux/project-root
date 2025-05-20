'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const apiRoutes = require('./routes/api.js');
// const fccTestingRoutes = require('./routes/fcctesting.js'); // Commenté : Ce fichier n'est pas utilisé dans notre configuration
// const runner = require('./test-runner'); // Commenté : Ce fichier n'est pas utilisé dans notre configuration

const app = express();

// Sécurité : Désactive X-Powered-By et configure d'autres en-têtes de sécurité
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); // Pour les tests FCC

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Page d'index (front-end)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// Pour les tests FCC
// fccTestingRoutes(app); // Commenté

// Routage pour l'API
apiRoutes(app);

// Gestionnaire 404 - doit être le dernier
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;

// Démarrage du serveur et des tests
app.listen(port, function () {
  console.log("Listening on port " + port);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        // runner.run(); // Commenté
      } catch (e) {
        console.log('Tests are not valid:', e);
      }
    }, 1500); // Ce timeout est généralement pour laisser le temps au serveur de démarrer avant de lancer les tests FCC
  }
});

module.exports = app; // pour les tests