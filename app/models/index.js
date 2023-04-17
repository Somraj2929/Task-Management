const Task = require('./task');

// Define associations
Task.hasMany(Task, {
  foreignKey: 'parentId',
  as: 'subtasks',
});

module.exports = { Task };
