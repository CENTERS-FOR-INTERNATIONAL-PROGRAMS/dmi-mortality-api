const db = require('../db/connection');

class UserController {
  
    async getUsers(req, res) {
      try {
        const [rows] = await this.connection.execute('SELECT * FROM users'); //table name in db
        res.json(rows);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
  
  module.exports = UserController;
  
