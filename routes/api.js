const express = require('express');
const router = express.Router();
const convertHandler = require('../controllers/convertHandler');

router.get('/convert', (req, res) => {
  try {
    const input = req.query.input;
    if (!input) return res.status(400).json({ error: 'No input provided' });

    const result = convertHandler.convert(input);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    
    return res.json(result);
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
