const { Router } = require('express');
const Zodiac = require('../models/Zodiac');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const ZodiacId = await Zodiac.getZodiacById(id);
    res.json(ZodiacId);
  })

  .get('/', async (req, res) => {
    const Zodiacs = await Zodiac.getAllZodiacs();
    res.json(Zodiacs);
  });
