const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Bird = require('../lib/models/Bird');

describe('birds routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/birds should return a list of birds', async () => {
    const res = await request(app).get('/birds');
    const birds = await Bird.getAllBirds();
    const expected = birds.map((bird) => {
      return {
        id: bird.id,
        bird_name: bird.bird_name,
        average_wingspan_in_cm: bird.average_wingspan_in_cm,
        flying_bird: bird.flying_bird,
      };
    });
    expect(res.body).toEqual(expected);
  });

  // it('/birds/:id should return a bird from the list', async () => {
  //   const res = await request(app).get('/birds/1');
  //   const golden = {
  //     id: 1,
  //     bird_name: 'Golden Eagle',
  //     average_wingspan_in_cm: 200,
  //     flying_bird: 'true',
  //   };
  //   expect(res.body).toEqual(golden);
  // });

  // it('POST /birds should create a new bird', async () => {
  //   const bird = new Bird({
  //     bird_name: 'Stellers Jay',
  //     average_wingspan_in_cm: 46,
  //     flying_bird: 'true',
  //   });
  //   const res = await request(app).post('/birds').send(bird);
  //   expect(res.body.bird_name).toEqual(bird.bird_name);
  //   expect(res.body.average_wingspan_in_cm).toEqual(
  //     bird.average_wingspan_in_cm
  //   );
  //   expect(res.body.flying_bird).toEqual(bird.flying_bird);
  //   const count = await Bird.count();
  //   expect(count).toEqual(6);
  // });

  afterAll(() => {
    pool.end();
  });
});
