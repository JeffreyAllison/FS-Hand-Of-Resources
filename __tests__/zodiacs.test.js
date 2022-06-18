const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Zodiac = require('../lib/models/Zodiac');

describe('zodiacs routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/zodiacs should return a list of zodiacs', async () => {
    const res = await request(app).get('/zodiacs');
    const zodiacs = await Zodiac.getAllZodiacs();
    const expected = zodiacs.map((zodiac) => {
      return {
        id: zodiac.id,
        zodiac_name: zodiac.zodiac_name,
        zodiac_symbol: zodiac.zodiac_symbol,
        zodiac_element: zodiac.zodiac_element,
      };
    });
    expect(res.body).toEqual(expected);
  });

  it('/zodiacs/:id should return a zodiac from the list', async () => {
    const res = await request(app).get('/zodiacs/1');
    const aries = {
      id: '1',
      zodiac_name: 'Aries',
      zodiac_symbol: 'Ram',
      zodiac_element: 'Fire',
    };
    expect(res.body).toEqual(aries);
  });

  it('POST /zodiacs should create a new zodiac', async () => {
    const zodiac = new Zodiac({
      zodiac_name: 'Virgo',
      zodiac_symbol: 'Fertility/Harvest Deity',
      zodiac_element: 'Earth',
    });
    const res = await request(app).post('/zodiacs').send(zodiac);
    expect(res.body.zodiac_name).toEqual(zodiac.zodiac_name);
    expect(res.body.zodiac_symbol).toEqual(zodiac.zodiac_symbol);
    expect(res.body.zodiac_element).toEqual(zodiac.zodiac_element);
    const count = await Zodiac.count();
    expect(count).toEqual(6);
  });

  it('PUT /zodiacs/:id should update the specific zodiac', async () => {
    const resp = await request(app)
      .put('/zodiacs/3')
      .send({ zodiac_symbol: 'The Twins' });
    expect(resp.status).toEqual(200);
    expect(resp.body.zodiac_symbol).toEqual('The Twins');
  });

  afterAll(() => {
    pool.end();
  });
});
