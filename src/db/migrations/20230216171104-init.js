const { TASK_TABLE, TaskSchema } = require('../models/task.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Creates a table with specified attributes.
    await queryInterface.createTable(TASK_TABLE, TaskSchema);
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Drops the specified table.
    await queryInterface.dropTable(TASK_TABLE);
  },
};
