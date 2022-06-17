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
