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

  static async getAllGuitars() {
    const { rows } = await pool.query(
      'SELECT id, guitar_type, body_material, wood_type FROM guitars;'
    );
    return rows.map((row) => new Guitar(row));
  }
}
module.exports = Guitar;
