const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
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
        notEmpty: {
          msg: 'Title is required',
        },
        not: {
          args: /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          msg: 'Title must not contain special characters',
        }
      }
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Summary is required',
        },
      }
    },
    healthScore: {
      type: DataTypes.INTEGER,
      unique: 'composite_unique',
      validate: {
        isInt: {
          msg: 'Health score must be an integer',
        },
        max: {
          args: 100,
          msg: 'Health score must be less than or equal 100',
        },
        min: {
          args: 0,
          msg: 'Health score must be greater than or 0',
        }
      }
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    servings: {
      type: DataTypes.INTEGER,
    },
    readyInMinutes: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, 
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
};
