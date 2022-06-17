const { Router } = require('express');
const Guitar = require('../models/Guitar');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const GuitarId = await Guitar.getGuitarById(id);
    res.json(GuitarId);
  })

  .get('/', async (req, res) => {
    const Guitars = await Guitar.getAllGuitars();
    res.json(Guitars);
  });
