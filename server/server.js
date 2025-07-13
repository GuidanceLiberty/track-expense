const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: "./config.env" });

const port = process.env.PORT || 5000;

// USE MIDDLEWARE
app.use(cors());
app.use(express.json());

// MONGODB CONNECTION
const con = require('./db/connection.js');

// USING ROUTES
app.use(require('./routes/route'));

con.then(db => {
  if (!db) return process.exit(1);

  // Start the HTTP server
  app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
  });

  app.on('error', err => {
    console.log(`Failed to connect with HTTP server: ${err}`);
  });

}).catch(err => {
  console.log(`Connection Failed: ${err}`);
});

module.exports = app;
