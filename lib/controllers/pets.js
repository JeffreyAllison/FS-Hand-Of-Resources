const { Router } = require('express');
const Pet = require('../models/Pet');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const PetId = await Pet.getPetById(id);
    res.json(PetId);
  })

  .get('/', async (req, res) => {
    const Pets = await Pet.getAllPets();
    res.json(Pets);
  });
