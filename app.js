const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to database "mestodb"');
});

app.use((req, res, next) => {
  req.user = {
    _id: '649c3bb02b70de008712dfb0',
  };

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
