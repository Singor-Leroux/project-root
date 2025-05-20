const express = require('express');
const router = express.Router();
const convertHandler = require('../controllers/convertHandler');

router.get('/convert', (req, res) => {
  const input = req.query.input;
  if (!input) return res.status(400).json({ error: 'No input provided' });

  const result = convertHandler.convert(input);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  
  return res.json(result);
});

module.exports = router;
