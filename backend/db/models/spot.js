'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'ownerId', as: 'Owner'});
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', hooks: true, onDelete: 'CASCADE' });
      Spot.hasMany(models.Booking, { foreignKey: 'userId', hooks: true, onDelete: 'CASCADE' });
      Spot.hasMany(models.Review, { foreignKey: 'spotId', hooks: true, onDelete: 'CASCADE' });
    }
  }
  Spot.init({
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,

    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
      validate:{
        len: [1, 50]
      }
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lat: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    lng: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
