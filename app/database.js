const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_development', 'postgres', 'Rock2929', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false, // disable timestamps for all models
  },
});

module.exports = sequelize;
