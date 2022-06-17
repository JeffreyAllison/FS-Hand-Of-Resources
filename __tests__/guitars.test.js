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

  it('/guitars/:id should return a guitar from the list', async () => {
    const res = await request(app).get('/guitars/1');
    const strat = {
      id: '1',
      guitar_type: 'Stratocaster',
      body_material: 'Wood',
      wood_type: 'Alder',
    };
    expect(res.body).toEqual(strat);
  });

  it('POST /guitars should create a new guitar', async () => {
    const guitar = new Guitar({
      guitar_type: 'SG',
      body_material: 'Wood',
      wood_type: 'Mahogany',
    });
    const res = await request(app).post('/guitars').send(guitar);
    expect(res.body.guitar_type).toEqual(guitar.guitar_type);
    expect(res.body.body_material).toEqual(guitar.body_material);
    expect(res.body.wood_type).toEqual(guitar.wood_type);
    const count = await Guitar.count();
    expect(count).toEqual(6);
  });

  it('PUT /guitars/:id should update the specific guitar', async () => {
    const resp = await request(app)
      .put('/guitars/3')
      .send({ guitar_type: 'Les Paul Custom' });
    expect(resp.status).toEqual(200);
    expect(resp.body.guitar_type).toEqual('Les Paul Custom');
  });

  afterAll(() => {
    pool.end();
  });
});
