
export const config = {
  HOST: "DESKTOP-PBR1Q9G\\SQLEXPRESS",
  USER: "icap",
  PASSWORD: "Icap2023#",
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
