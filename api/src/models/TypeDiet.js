const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
      "TypeDiet",
      {
        name: {
          type: DataTypes.ENUM([
            "gluten free",
            "ketogenic",
            "vegetarian",
            "lacto ovo vegetarian",
            "vegan",
            "pescatarian",
            "paleolithic",
            "primal",
            "whole 30",
            "dairy free",
          ]),
          allowNull: false
        },
      },
      {
        timestamps: false,
      }
    );
};