const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('typeDiet', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
                msg: 'Id must be a valid UUID',
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
        }
    }, {
        timestamps: false,
      });
};