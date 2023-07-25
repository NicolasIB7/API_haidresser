import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';

interface ServiceAttributes {
  id: number;
  name: string[];
  description: string;
  precio:number;
  duration: number;
  }

  interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

  export interface ServiceInstance
  extends Model<ServiceAttributes, ServiceCreationAttributes>,
  ServiceAttributes {}


    module.exports = (sequelize: Sequelize) => {
        const Service = sequelize.define<ServiceInstance>(
          'Service',
          {
            id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
            },
            name:{
                type: DataTypes.ENUM("Corte", "Barba", "Corte niño","Corte y barba"),
                allowNull: false,
            },
            description:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            precio:{
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            duration:{
            type: DataTypes.NUMBER,
            allowNull: false,
            }
          },
          {
            timestamps: false,
          }
        );
      
        return Service;
      };