const express = require('express');
require('express-async-errors');

const router = require('./routes');

const app = express();

app.use(express.json());
app.use(router);

app.use((error, request, response, next) => {
  console.log('#### Error Handler ####');
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server started at http://localhost:3000');
});
