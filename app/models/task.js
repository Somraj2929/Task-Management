const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Task extends Model {}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'task',
  timestamps: true, // add timestamps fields
  createdAt: 'createdAt', // change the createdAt field name
  updatedAt: 'updatedAt', // change the updatedAt field name
});

Task.addHook('beforeCreate', (task) => {
  if (!task.parentId) {
    task.parentId = null; // set parentId to null if not provided
  }
});

module.exports = Task;