const { Router } = require('express');
const Zodiac = require('../models/Zodiac');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const zodiac = await Zodiac.delete(req.params.id);
      res.json(zodiac);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const zodiac = await Zodiac.updateZodiacById(req.params.id, req.body);
      res.json(zodiac);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const zodiac = await Zodiac.insert(req.body);
      res.json(zodiac);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const ZodiacId = await Zodiac.getZodiacById(id);
    res.json(ZodiacId);
  })

  .get('/', async (req, res) => {
    const Zodiacs = await Zodiac.getAllZodiacs();
    res.json(Zodiacs);
  });
