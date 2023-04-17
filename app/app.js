const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const { Task } = require('./models'); // Import the models

const tasksRouter = require('./routes/api/tasks');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());

// Set the view engine to use HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Route to render the index.html file
app.get('/', function(req, res) {
  res.render('index');
});

app.use('/api/tasks', tasksRouter);

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// Sync database and start server
sequelize.sync().then(() => { // Add the {force: true} option to drop and recreate the tables
  app.listen(5050, () => {
    console.log('Server started on http://localhost:5050');
  });
});


// const express = require('express');
// const path = require('path');
// const logger = require('morgan');
// const bodyParser = require('body-parser');
// const sequelize = require('./database');
// const { Task } = require('./models'); // Import the models

// const tasksRouter = require('./routes/api/tasks');

// const app = express();

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/tasks', tasksRouter);
// // Set the view engine to use HTML
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

// // Route to render the index.html file
// app.get('/', function(req, res) {
//   res.render('index');
// });



// // Handle errors
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Server error' });
// });

// // Sync database and start server
// sequelize.sync({ force: true }).then(() => { // Add the {force: true} option to drop and recreate the tables
//   app.listen(3000, () => {
//     console.log('Server started on http://localhost:3000');
//   });
// });

