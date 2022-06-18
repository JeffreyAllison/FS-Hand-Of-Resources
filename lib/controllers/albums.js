const { Router } = require('express');
const Album = require('../models/Album');

module.exports = Router().get('/', async (req, res) => {
  const Albums = await Album.getAllAlbums();
  res.json(Albums);
});
