const { Router } = require('express');
const Pet = require('../models/Pet');

module.exports = Router().get('/', async (req, res) => {
  const Pets = await Pet.getAllPets();
  res.json(Pets);
});
