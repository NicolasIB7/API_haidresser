import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';

interface AppointmentDetailAttributes {
  id: number;
 

  }

  interface AppointmentDetailCreationAttributes extends Optional<AppointmentDetailAttributes, 'id'> {}

  export interface AppointmentDetailInstance
  extends Model<AppointmentDetailAttributes, AppointmentDetailCreationAttributes>,
  AppointmentDetailAttributes {}


    module.exports = (sequelize: Sequelize) => {
        const AppointmentDetail = sequelize.define<AppointmentDetailInstance>(
          'AppointmentDetail',
          {
            id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
            //AGREGAR MAS COSAS
          },
        },
          {
            timestamps: false,
          }
        );
      
        return AppointmentDetail;
      };