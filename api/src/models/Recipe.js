const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define(
    "Recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            args: true,
            msg: "Title is required",
          },
          isAlpha: {
            args: true,
            msg: "Title must be only letters",
          },
          len: {
            args: [3, 80],
            msg: "Title must be between 3 and 80 characters",
          },
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Summary is required",
          },
          len: {
            args: [3, 255],
            msg: "Summary must be between 3 and 255 characters",
          },
        },
      },
      healthScore: {
        type: DataTypes.STRING,
      },
      instructions: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
