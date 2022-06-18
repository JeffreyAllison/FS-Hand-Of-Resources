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

  afterAll(() => {
    pool.end();
  });
});
