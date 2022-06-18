const { Router } = require('express');
const Bird = require('../models/Bird');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const bird = await Bird.delete(req.params.id);
      res.json(bird);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const bird = await Bird.insert(req.body);
      res.json(bird);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const bird = await Bird.updateBirdById(req.params.id, req.body);
      res.json(bird);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const BirdId = await Bird.getBirdById(id);
    res.json(BirdId);
  })

  .get('/', async (req, res) => {
    const Birds = await Bird.getAllBirds();
    res.json(Birds);
  });
