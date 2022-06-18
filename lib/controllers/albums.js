const { Router } = require('express');
const Album = require('../models/Album');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const AlbumId = await Album.getAlbumById(id);
    res.json(AlbumId);
  })

  .get('/', async (req, res) => {
    const Albums = await Album.getAllAlbums();
    res.json(Albums);
  });
