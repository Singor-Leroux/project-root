require('dotenv').config();
const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // Export pour les tests
