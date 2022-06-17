const guitars = require('../controllers/guitars');
const pool = require('../utils/pool');

class Guitar {
  id;
  guitar_type;
  body_material;
  wood_type;

  constructor(row) {
    this.id = row.id;
    this.guitar_type = row.guitar_type;
    this.body_material = row.body_material;
    this.wood_type = row.wood_type;
  }

  static async updateGuitarById(id, attrs) {
    const guitar = await Guitar.getGuitarById(id);
    if (!guitar) return null;
    const { guitar_type, body_material, wood_type } = {
      ...guitar,
      ...attrs,
    };
    const { rows } = await pool.query(
      'UPDATE guitars SET guitar_type=$2, body_material=$3, wood_type=$4 WHERE id=$1 RETURNING *',
      [id, guitar_type, body_material, wood_type]
    );
    return new Guitar(rows[0]);
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM guitars');
    return Number(rows[0].count);
  }

  static async insert({ guitar_type, body_material, wood_type }) {
    const { rows } = await pool.query(
      'INSERT INTO guitars (guitar_type, body_material, wood_type) VALUES ($1, $2, $3) RETURNING *',
      [guitar_type, body_material, wood_type]
    );
    return new Guitar(rows[0]);
  }

  static async getGuitarById(id) {
    const { rows } = await pool.query('SELECT * FROM guitars WHERE id=$1;', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Guitar(rows[0]);
  }

  static async getAllGuitars() {
    const { rows } = await pool.query(
      'SELECT id, guitar_type, body_material, wood_type FROM guitars;'
    );
    return rows.map((row) => new Guitar(row));
  }
}
module.exports = Guitar;
