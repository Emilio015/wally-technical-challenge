'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Search extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Search.belongsTo(models.user, {
                foreignKey: 'user_id',
                as: 'user'
            });

        }
    }

    Search.init({
        user_id: DataTypes.INTEGER.UNSIGNED,
        address: DataTypes.TEXT,
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING,
        response: DataTypes.TEXT
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'search',
        tableName: 'searches'
    });

    return Search;
};