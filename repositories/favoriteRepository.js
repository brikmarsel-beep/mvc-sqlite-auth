const db = require("../config/db");

class FavoriteRepository {
  getByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM Favorites WHERE userId = ? ORDER BY createdAt DESC`,
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  add({ userId, videoId, title, thumbnailUrl }) {
    const createdAt = new Date().toISOString();

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT OR IGNORE INTO Favorites (userId, videoId, title, thumbnailUrl, createdAt)
         VALUES (?, ?, ?, ?, ?)`,
        [userId, videoId, title, thumbnailUrl, createdAt],
        function (err) {
          if (err) return reject(err);
          resolve(this.changes);
        }
      );
    });
  }

  remove({ userId, favoriteId }) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM Favorites WHERE id = ? AND userId = ?`,
        [favoriteId, userId],
        function (err) {
          if (err) return reject(err);
          resolve(this.changes);
        }
      );
    });
  }
}

module.exports = new FavoriteRepository();
