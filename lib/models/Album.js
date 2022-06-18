const albums = require('../controllers/albums');
const pool = require('../utils/pool');

class Album {
  id;
  artist_name;
  album_title;
  album_genres;

  constructor(row) {
    this.id = row.id;
    this.artist_name = row.artist_name;
    this.album_title = row.album_title;
    this.album_genres = row.album_genres;
  }
  static async getAlbumById(id) {
    const { rows } = await pool.query('SELECT * FROM albums WHERE id=$1;', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Album(rows[0]);
  }

  static async getAllAlbums() {
    const { rows } = await pool.query(
      'SELECT id, artist_name, album_title, album_genres FROM albums;'
    );
    return rows.map((row) => new Album(row));
  }
}
module.exports = Album;
