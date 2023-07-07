const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./errors/ErrorHandler');
const { validateCreationUser } = require('./middlewares/validation');
const routes = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', validateCreationUser, createUser);

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to database "mestodb"');
});

app.use(helmet());
app.use(auth, routes);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
