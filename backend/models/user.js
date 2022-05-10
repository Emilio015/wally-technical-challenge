'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init({
        names: DataTypes.STRING,
        surnames: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Debe ingresar un correo electrónico válido.'
                }
            },
            unique: {
                args: true,
                msg: 'Este correo electrónico ya se encuentra registrado.'
            }
        },
        password: DataTypes.STRING
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'user',
        tableName: 'users'
    });

    return User;
};