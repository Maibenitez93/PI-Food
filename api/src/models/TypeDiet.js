const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
      "TypeDiet",
      {
        name: {
          type: DataTypes.TEXT,
          allowNull: false
        },
      },
      {
        timestamps: false,
      }
    );
};