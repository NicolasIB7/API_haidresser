import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';

interface HairdresserAttributes {
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
  active:boolean;

    
  }

  interface HairdresserCreationAttributes extends Optional<HairdresserAttributes, 'id'> {}

  export interface HairdresserInstance
  extends Model<HairdresserAttributes, HairdresserCreationAttributes>,
  HairdresserAttributes {}


    module.exports = (sequelize: Sequelize) => {
        const Hairdresser = sequelize.define<HairdresserInstance>(
          'Hairdresser',
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
            },
            active:{
              type: DataTypes.BOOLEAN,
              defaultValue: false,
            }
          },
          {
            timestamps: false,
          }
        );
      
        return Hairdresser;
      };