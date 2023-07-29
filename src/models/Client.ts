import { DataTypes, Model, Optional } from "sequelize";
import { Sequelize } from "sequelize";
var bcrypt = require('bcryptjs');
//import bcrypt  from 'bcryptjs';

interface ClientAttributes {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  // repassword: string;
  date: string;
  dni: number;
  photo: string;
  phone: number;
  location: string;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {}

export interface ClientInstance
  extends Model<ClientAttributes, ClientCreationAttributes>,
    ClientAttributes {
      comparePassword(candidatePassword: string): Promise<boolean>;
    }

  const Client = (sequelize: Sequelize) => {
  const clientModel= sequelize.define<ClientInstance>(
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
      // repassword: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },

      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
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
              const salt = await bcrypt.genSalt(10);
              client.password = await bcrypt.hash(client.password, salt);
            }
          } catch (error) {
            throw new Error("Fail to hash password");
          }
        },
      },
    }
  );
  clientModel.prototype.comparePassword = async function (candidatePassword:string) {

    return await bcrypt.compare(candidatePassword, this.password)
  };

return clientModel

};



export default Client;