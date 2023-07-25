import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';

interface ClientAttributes {
    id: number;
    name:string;
    lastname:string;
    email:string;
    password:string;
    date:string;
    dni:number;
    photo:string;
    phone:number;
    location:string;
    uid:string;
  }

  interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'> {}

  export interface ClientInstance
  extends Model<ClientAttributes, ClientCreationAttributes>,
    ClientAttributes {}


    module.exports = (sequelize: Sequelize) => {
        const Client = sequelize.define<ClientInstance>(
          'Client',
          {
            id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            date:{
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            dni:{
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            photo:{
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            phone:{
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            location:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            uid:{
                type: DataTypes.STRING,
            }
            
          },
          {
            timestamps: false,
          }
        );
      
        return Client;
      };