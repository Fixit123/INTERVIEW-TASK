'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Messages', [
      {
        content: 'Welcome to our interview task! This is the first sample message.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'This application demonstrates CRUD operations with Sequelize migrations and RTK Query.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'The frontend will be built with Next.js, ShadCN UI, and Redux Toolkit Query for state management.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'This is an additional message to show the table functionality with multiple entries.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {});
  }
};
