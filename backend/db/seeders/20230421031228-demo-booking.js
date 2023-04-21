'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Bookings';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
    {
      spotId: 4,
      userId: 1,
      startDate: new Date('2021-06-25'),
      endDate: new Date('2021-07-25'),
    },
     {
       spotId: 3,
       userId: 2,
       startDate: new Date('2021-06-25'),
       endDate: new Date('2021-07-10'),
     },
     {
       spotId: 4,
       userId: 3,
       startDate: new Date('2021-06-30'),
       endDate: new Date('2021-07-20'),
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options);
  }
};
