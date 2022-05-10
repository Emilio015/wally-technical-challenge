'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Favorite extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Favorite.belongsTo(models.user, {
                foreignKey: 'user_id',
                as: 'user'
            });

        }
    }

    Favorite.init({
        user_id: DataTypes.INTEGER.UNSIGNED,
        address: DataTypes.TEXT,
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'favorite',
        tableName: 'favorites'
    });

    return Favorite;
};