const guitars = require('../controllers/guitars');
const pool = require('../utils/pool');

class Zodiac {
  id;
  zodiac_name;
  zodiac_symbol;
  zodiac_element;

  constructor(row) {
    this.id = row.id;
    this.zodiac_name = row.zodiac_name;
    this.zodiac_symbol = row.zodiac_symbol;
    this.zodiac_element = row.zodiac_element;
  }

  static async getZodiacById(id) {
    const { rows } = await pool.query('SELECT * FROM zodiacs WHERE id=$1;', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Zodiac(rows[0]);
  }

  static async getAllZodiacs() {
    const { rows } = await pool.query(
      'SELECT id, zodiac_name, zodiac_symbol, zodiac_element FROM zodiacs;'
    );
    return rows.map((row) => new Zodiac(row));
  }
}
module.exports = Zodiac;
