import { DataTypes, Model, Optional } from "sequelize";
import { Sequelize } from "sequelize";
import { genSalt, hash } from "bcrypt-ts";

interface HairdresserAttributes {
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
  uid: string;
  active: boolean;
}

interface HairdresserCreationAttributes
  extends Optional<HairdresserAttributes, "id"> {}

export interface HairdresserInstance
  extends Model<HairdresserAttributes, HairdresserCreationAttributes>,
    HairdresserAttributes {}

module.exports = (sequelize: Sequelize) => {
  const Hairdresser = sequelize.define<HairdresserInstance>(
    "Hairdresser",
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
      uid: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeSave: async (hairdresser: HairdresserInstance) => {
          try {
            if (hairdresser.changed("password") || hairdresser.isNewRecord) {
              const salt = await genSalt(10);
              hairdresser.password = await hash(hairdresser.password, salt);
            }
          } catch (error) {
            throw new Error("Fail to hash password");
          }
        },
      },
    }
  );

  return Hairdresser;
};
