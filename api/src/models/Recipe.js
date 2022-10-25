const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'composite_unique',
      validate: {
        notNull: {
          args: true,
          msg: 'Title is required',
        },
        isAlpha: {
          args: true,
          msg: 'Title must be only letters',
        },
        len: {
          args: [3, 255],
          msg: 'Title must be between 3 and 255 characters',
        }
      }
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args:true,
          msg: 'Summary is required',
        },
      }
    },
    healthScore: {
      type: DataTypes.INTEGER,
      unique: 'composite_unique',
      validate: {
        isInt: {
          args: true,
          msg: 'Health score must be an integer',
        },
        min: {
          args: 1,
          msg: 'Health score must be greater than or 1',
        },
        max: {
          args: 100,
          msg: 'Health score must be less than or equal 100',
        }
      }
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
      allowNull: false
    }
  }, {
    timestamps: false,
  });
};
