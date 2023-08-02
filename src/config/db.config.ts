
export const config = {
  HOST: "localhost",
  USER: "sa",
  PASSWORD: "12345679",
  DB: "DMI_MortalityDW",
  DBPORT: 1433,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const dialect = "mssql";
