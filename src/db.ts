import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import Client from "./models/Client";

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

interface Models {
  Client: any; // Reemplaza 'any' con el tipo correcto para el modelo 'Client'
  Hairdresser:any
  // Agrega otros modelos aquí si los tienes, por ejemplo: Hairdresser: any;
}

const modelDefiners: any[] = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)).default);

  });

const db: Models & { conn: Sequelize } = { conn: sequelize } as Models & { conn: Sequelize };


modelDefiners.forEach((model) => {
  if (typeof model === "function") {
    const modelInstance = model(sequelize);
    const modelName = modelInstance.name;

    if (modelName === "Client") {
      db.Client = modelInstance;

    }
    if (modelName === "Hairdresser") {
      db.Hairdresser = modelInstance;
    }

    // Si tienes más modelos, puedes agregarlos de manera similar aquí
  }
});


export default db;


