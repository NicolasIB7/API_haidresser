import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

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

const modelDefiners: any[] = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)).default);
  });

const db: any = { conn: sequelize };

modelDefiners.forEach((model) => {
  const modelInstance = model(sequelize);
  const modelName = modelInstance.name;

  if (modelName === "Client") {
    db.Client = modelInstance;
  }

  if (modelName === "Hairdresser") {
    db.Hairdresser = modelInstance;
  }
});

// Configurar relaciones entre los modelos (ejemplo)
// db.Client.hasMany(db.Hairdresser);
// db.Hairdresser.belongsTo(db.Client);

export default db;
