const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Guitar = require('../lib/models/Guitar');

describe('guitars routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/guitars should return a list of guitars', async () => {
    const res = await request(app).get('/guitars');
    const guitars = await Guitar.getAllGuitars();
    const expected = guitars.map((guitar) => {
      return {
        id: guitar.id,
        guitar_type: guitar.guitar_type,
        body_material: guitar.body_material,
        wood_type: guitar.wood_type,
      };
    });
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
