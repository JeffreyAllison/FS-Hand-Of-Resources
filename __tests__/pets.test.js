const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Pet = require('../lib/models/Pet');

describe('pets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/pets should return a list of pets', async () => {
    const res = await request(app).get('/pets');
    const pets = await Pet.getAllPets();
    const expected = pets.map((pet) => {
      return {
        id: pet.id,
        pet_name: pet.pet_name,
        pet_colors: pet.pet_colors,
        pet_type: pet.pet_type,
      };
    });
    expect(res.body).toEqual(expected);
  });

  it('/pets/:id should return a pet from the list', async () => {
    const res = await request(app).get('/pets/1');
    const larry = {
      id: '1',
      pet_name: 'Larry',
      pet_colors: 'Blue',
      pet_type: 'fish',
    };
    expect(res.body).toEqual(larry);
  });

  it('POST /pets should create a new pet', async () => {
    const pet = new Pet({
      pet_name: 'Gracie',
      pet_colors: 'Brown',
      pet_type: 'dog',
    });
    const res = await request(app).post('/pets').send(pet);
    expect(res.body.pet_name).toEqual(pet.pet_name);
    expect(res.body.pet_colors).toEqual(pet.pet_colors);
    expect(res.body.pet_type).toEqual(pet.pet_type);
    const count = await Pet.count();
    expect(count).toEqual(6);
  });

  it('PUT /pets/:id should update the specific pet', async () => {
    const resp = await request(app)
      .put('/pets/3')
      .send({ pet_name: 'Midnite' });
    expect(resp.status).toEqual(200);
    expect(resp.body.pet_name).toEqual('Midnite');
  });

  it('DELETE /pets/:id should delete a specific pet', async () => {
    const resp = await request(app).delete('/pets/2');
    expect(resp.status).toEqual(200);
    const { body } = await request(app).get('/pets/2');
    expect(body).toEqual(null);
  });

  afterAll(() => {
    pool.end();
  });
});
