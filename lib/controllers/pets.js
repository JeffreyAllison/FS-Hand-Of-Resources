const { Router } = require('express');
const Pet = require('../models/Pet');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const pet = await Pet.insert(req.body);
      res.json(pet);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const PetId = await Pet.getPetById(id);
    res.json(PetId);
  })

  .get('/', async (req, res) => {
    const Pets = await Pet.getAllPets();
    res.json(Pets);
  });
