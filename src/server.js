// server.js
const express = require('express');
const setupGraphQL = require('./utils/graphql');
const setupWorker = require('./utils/setupWorker');

require('dotenv').config();

if (process.env.JOB) {
  console.log('Job Processor started');

  setupWorker();
} else {
  console.log('Web Server started');

  const app = express();

  const PORT = process.env.PORT || 3000;

  setupGraphQL(app);

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
