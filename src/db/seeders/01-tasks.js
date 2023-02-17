const { TASK_TABLE } = require('../models/task.model');

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkInsert(TASK_TABLE, [
      {
        title: 'Create form input lastName',
        description: 'create input lastName of max. 20 characters, from the mail form',
        status: 'success',
        delivery_date: new Date(),
        comments: 'comments',
      },
    ]);
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkDelete(TASK_TABLE, null, {});
  },
};
