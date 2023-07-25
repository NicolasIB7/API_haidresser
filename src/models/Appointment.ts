import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';

interface AppointmentAttributes {
  id: number;
  availability:boolean;
  date:string;
  time:number;

  }

  interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, 'id'> {}

  export interface AppointmentInstance
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>,
  AppointmentAttributes {}


    module.exports = (sequelize: Sequelize) => {
        const Appointment = sequelize.define<AppointmentInstance>(
          'Appointment',
          {
            id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
            },
            availability:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            date:{
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            time:{
                type: DataTypes.TIME,
                allowNull: false,
            }
          },
          {
            timestamps: false,
          }
        );
      
        return Appointment;
      };