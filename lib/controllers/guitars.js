const { Router } = require('express');
const Guitar = require('../models/Guitar');

module.exports = Router().get('/', async (req, res) => {
  const Guitars = await Guitar.getAllGuitars();
  res.json(Guitars);
});
