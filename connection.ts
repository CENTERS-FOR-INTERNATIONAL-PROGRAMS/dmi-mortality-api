const mssql = require('mssql')
const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const db = new Sequelize(process.env.MSSQL_DB, process.env.MSSQL_USER, process.env.MSSQL_PASSWORD, {
    host: process.env.MSSQL_HOST,
    port: process.env.MSSQL_PORT || 1433,
    dialect: 'mssql',
    dialectOptions: {
        requestTimeout: 30000,
        options: {
            encrypt: true,
        }
    }
});


//Fetch all values
async function getUsers() {
    try {
        const [rows] = await db.query("SELECT * FROM Redcap_july_08");
        return JSON.stringify(rows);
    } catch (error) {
        console.error("Error fetching Redcap data:", error);
        throw error;
    }
}
//specify the data wanted for gender 1:male
async function getUsersByGender(genderId) {
    try {
        const [rows] = await db.query("SELECT * FROM Redcap_july_08 WHERE gender = '" + genderId + "'");
        return JSON.stringify(rows);
    } catch (error) {
        console.error("Error fetching users by gender:", error);
        throw error;
    }
}



module.exports = { getUsers, getUsersByGender }