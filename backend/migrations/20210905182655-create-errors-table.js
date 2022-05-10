'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('errors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER.UNSIGNED
            },
            model: {
                type: Sequelize.STRING,
                allowNull: false
            },
            action: {
                type: Sequelize.STRING,
                allowNull: false
            },
            error_data: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            error_msg: {
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
        await queryInterface.dropTable('errors');
    }
};