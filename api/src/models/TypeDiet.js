const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('typeDiet', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Name is required',
                }
            }
        }
    }, {
        timestamps: false,
      });
};