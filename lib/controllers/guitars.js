const { Router } = require('express');
const Guitar = require('../models/Guitar');

module.exports = Router()
  .put('/:id', async (req, res, next) => {
    try {
      const guitar = await Guitar.updateGuitarById(req.params.id, req.body);
      res.json(guitar);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const guitar = await Guitar.insert(req.body);
      res.json(guitar);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const GuitarId = await Guitar.getGuitarById(id);
    res.json(GuitarId);
  })

  .get('/', async (req, res) => {
    const Guitars = await Guitar.getAllGuitars();
    res.json(Guitars);
  });
