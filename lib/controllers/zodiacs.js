const { Router } = require('express');
const Zodiac = require('../models/Zodiac');

module.exports = Router().get('/', async (req, res) => {
  const Zodiacs = await Zodiac.getAllZodiacs();
  res.json(Zodiacs);
});
