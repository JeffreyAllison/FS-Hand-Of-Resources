const pets = require('../controllers/pets');
const pool = require('../utils/pool');

class Pet {
  id;
  pet_name;
  pet_colors;
  pet_type;

  constructor(row) {
    this.id = row.id;
    this.pet_name = row.pet_name;
    this.pet_colors = row.pet_colors;
    this.pet_type = row.pet_type;
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM pets WHERE id = $1 RETURNING *',
      [id]
    );
    return new Pet(rows[0]);
  }

  static async updatePetById(id, attrs) {
    const pet = await Pet.getPetById(id);
    if (!pet) return null;
    const { pet_name, pet_colors, pet_type } = {
      ...pet,
      ...attrs,
    };
    const { rows } = await pool.query(
      'UPDATE pets SET pet_name=$2, pet_colors=$3, pet_type=$4 WHERE id=$1 RETURNING *',
      [id, pet_name, pet_colors, pet_type]
    );
    return new Pet(rows[0]);
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM pets');
    return Number(rows[0].count);
  }

  static async insert({ pet_name, pet_colors, pet_type }) {
    const { rows } = await pool.query(
      'INSERT INTO pets (pet_name, pet_colors, pet_type) VALUES ($1, $2, $3) RETURNING *',
      [pet_name, pet_colors, pet_type]
    );
    return new Pet(rows[0]);
  }

  static async getAllPets() {
    const { rows } = await pool.query(
      'SELECT id, pet_name, pet_colors, pet_type FROM pets;'
    );
    return rows.map((row) => new Pet(row));
  }

  static async getPetById(id) {
    const { rows } = await pool.query('SELECT * FROM pets WHERE id=$1;', [id]);
    if (!rows[0]) return null;
    return new Pet(rows[0]);
  }
}
module.exports = Pet;
