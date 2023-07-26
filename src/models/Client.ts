import { DataTypes, Model, Optional } from "sequelize";
import { Sequelize } from "sequelize";
import { genSalt, hash } from "bcrypt-ts";

interface ClientAttributes {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  repassword: string;
  date: string;
  dni: number;
  photo: string;
  phone: number;
  location: string;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {}

export interface ClientInstance
  extends Model<ClientAttributes, ClientCreationAttributes>,
    ClientAttributes {}

module.exports = (sequelize: Sequelize) => {
  const Client = sequelize.define<ClientInstance>(
    "Client",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      repassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      dni: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      photo: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      phone: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeSave: async (client: ClientInstance) => {
          try {
            if (client.changed("password") || client.isNewRecord) {
              const salt = await genSalt(10);
              client.password = await hash(client.password, salt);
            }
          } catch (error) {
            throw new Error("Fail to hash password");
          }
        },
      },
    }
  );

  return Client;
};
