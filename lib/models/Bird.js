const birds = require('../controllers/birds');
const pool = require('../utils/pool');

class Bird {
  id;
  bird_name;
  average_wingspan_in_cm;
  flying_bird;

  constructor(row) {
    this.id = row.id;
    this.bird_name = row.bird_name;
    this.average_wingspan_in_cm = row.average_wingspan_in_cm;
    this.flying_bird = row.flying_bird;
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM birds');
    return Number(rows[0].count);
  }

  static async insert({ bird_name, average_wingspan_in_cm, flying_bird }) {
    const { rows } = await pool.query(
      'INSERT INTO birds (bird_name, average_wingspan_in_cm, flying_bird) VALUES ($1, $2, $3) RETURNING *',
      [bird_name, average_wingspan_in_cm, flying_bird]
    );
    return new Bird(rows[0]);
  }

  static async getAllBirds() {
    const { rows } = await pool.query(
      'SELECT id, bird_name, average_wingspan_in_cm, flying_bird FROM birds;'
    );
    return rows.map((row) => new Bird(row));
  }

  static async getBirdById(id) {
    const { rows } = await pool.query('SELECT * FROM amps WHERE id=$1;', [id]);
    if (!rows[0]) return null;
    return new Author(rows[0]);
  }
}
module.exports = Bird;
