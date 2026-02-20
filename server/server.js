const express = require('express');
const cors = require('cors');
require('./config/mongoose').connect();

const bodyParser = require('body-parser');

const usersRoute = require('./routes/users.js');
const questionsRoute = require('./routes/questions.js');
const customerRoute = require('./routes/customer.js');
const phoneRoute = require('./routes/phone.js');
const config = require('./config/config.js');
const app = express();
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

app.use(express.json());


app.use('', customerRoute);
app.use('/api/users', usersRoute);
app.use('/api/form', questionsRoute);
app.use('', phoneRoute);

app.listen(config.server.port, () => {
  console.log(`🚀 Server is running on port ${config.server.port}`);
});

