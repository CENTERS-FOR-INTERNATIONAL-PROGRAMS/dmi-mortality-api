


export const config = {
  HOST: "4VHM2T3-KEN",
  USER: "sa",
  PASSWORD: "Xkemricdc@123",
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
