const { Router } = require('express');
const Album = require('../models/Album');

module.exports = Router()
  .put('/:id', async (req, res, next) => {
    try {
      const album = await Album.updateAlbumById(req.params.id, req.body);
      res.json(album);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const album = await Album.insert(req.body);
      res.json(album);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const AlbumId = await Album.getAlbumById(id);
    res.json(AlbumId);
  })

  .get('/', async (req, res) => {
    const Albums = await Album.getAllAlbums();
    res.json(Albums);
  });
