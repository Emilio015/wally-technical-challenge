'use strict';

// PACKAGES
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
faker.locale = "es";
// END OF PACKAGES

module.exports = {
    up: async(queryInterface) => {
        /**
         * Add seed commands here.
         */
        let data = [];

        let password = await bcrypt.hash('password', 10);

        data.push({
            names: 'Emilio',
            surnames: 'Gonzales Torres',
            email: 'emi0810lio@hotmail.com',
            password,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await queryInterface.bulkInsert('users', data);
    },

    down: async(queryInterface) => {
        /**
         * Add commands to revert seed here.
         */
        await queryInterface.bulkDelete('users', null);
    }
};