const { Router } = require('express');
const Pet = require('../models/Pet');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const pet = await Pet.delete(req.params.id);
      res.json(pet);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const pet = await Pet.updatePetById(req.params.id, req.body);
      res.json(pet);
    } catch (e) {
      next(e);
    }
  })

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
