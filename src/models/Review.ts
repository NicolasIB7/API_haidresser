import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';

interface ReviewAttributes {
  id: number;
  title: string;
  message: string;
  rating: number
  }

  interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> {}

  export interface ReviewInstance
  extends Model<ReviewAttributes, ReviewCreationAttributes>,
  ReviewAttributes {}


    module.exports = (sequelize: Sequelize) => {
        const Review = sequelize.define<ReviewInstance>(
          'Review',
          {
            id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
            },
            title:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            message:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            rating:{
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            
          },
          {
            timestamps: false,
          }
        );
      
        return Review;
      };