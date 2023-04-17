const { Task } = require('../models');

const taskController = {
  async getAll(req, res) {
    try {
      const tasks = await Task.findAll();
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving tasks.' });
    }
  },

  async create(req, res) {
    try {
      const task = await Task.create(req.body);
      res.json({ success: true, task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating a task.' });
    }
  },

  async update(req, res) {
    try {
      const taskId = req.params.id;
      const [numRows, [updatedTask]] = await Task.update(req.body, {
        where: { id: taskId },
        returning: true,
      });
      if (numRows === 0) {
        res.status(404).json({ error: `Task with ID ${taskId} not found.` });
      } else {
        res.json({ success: true, task: updatedTask });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating a task.' });
    }
  },

  async delete(req, res) {
    try {
      const taskId = req.params.id;
      const numRows = await Task.destroy({ where: { id: taskId } });
      if (numRows === 0) {
        res.status(404).json({ error: `Task with ID ${taskId} not found.` });
      } else {
        res.json({ success: true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting a task.' });
    }
  },
};

module.exports = taskController;
