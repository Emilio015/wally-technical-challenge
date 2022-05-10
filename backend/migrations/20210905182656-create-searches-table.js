'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('searches', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER.UNSIGNED
            },
            user_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            latitude: {
                type: Sequelize.STRING,
                allowNull: false
            },
            longitude: {
                type: Sequelize.STRING,
                allowNull: false
            },
            response: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },
    down: async(queryInterface) => {
        await queryInterface.dropTable('searches');
    }
};