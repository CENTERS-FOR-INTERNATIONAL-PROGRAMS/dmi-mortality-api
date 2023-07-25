const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getUsers() {
    try {
        const [rows] = await pool.query("SELECT * FROM users ");
        return JSON.stringify(rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

async function getUser(id) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM users WHERE id = ?`,
            [id]
        );
        return rows[0]
    } catch (error) {
        console.error("Error fetching user:", error)
        throw error
    }
}

module.exports = { getUser, getUsers }