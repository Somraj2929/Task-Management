module.exports = {
    up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('tasks', [
        {
          title: 'Buy groceries',
          description: 'Go to the supermarket and buy some vegetables and fruits',
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Clean the house',
          description: 'Vacuum the carpets, wash the dishes, and dust the shelves',
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('tasks', null, {});
    }
  };
  