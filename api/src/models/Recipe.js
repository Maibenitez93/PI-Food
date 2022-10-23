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
      validate: {
        isUUID: 4,
        msg: 'Id must be a valid UUID',
      }
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
        isInt: {
          args: true,
          msg: 'Summary must be only numbers',
        }
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
      validate: {
        is: {
          args: ["^[a-z]+$",'i'],
          msg: 'Instructiones must be with caracteres'
        }
      }
    },
    servings: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: 'Servings must be an integer',
        },
        min: {
          args: 1,
          msg: 'Servings must be greater than or 1',
        },
        max: {
          args: 100,
          msg: 'Servings must be less than or equal 100',
        }
      }
    },
    readyInMinutes: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: {
          args: true,
          msg: 'readyInMinutes must be a float',
        }
      },
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ["^[a-z]+$",'i'],
          msg: 'Image must be with caracteres'
        }
      }
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
