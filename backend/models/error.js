'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Error extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here           
        }
    }

    Error.init({
        model: DataTypes.STRING,
        action: DataTypes.STRING,
        error_data: DataTypes.TEXT,
        error_msg: DataTypes.TEXT
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'error',
        tableName: 'errors'
    });

    return Error;
};