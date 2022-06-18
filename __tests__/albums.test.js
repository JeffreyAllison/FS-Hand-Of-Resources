const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Album = require('../lib/models/Album');

describe('albums routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/albums should return a list of albums', async () => {
    const res = await request(app).get('/albums');
    const albums = await Album.getAllAlbums();
    const expected = albums.map((album) => {
      return {
        id: album.id,
        artist_name: album.artist_name,
        album_title: album.album_title,
        album_genres: album.album_genres,
      };
    });
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
