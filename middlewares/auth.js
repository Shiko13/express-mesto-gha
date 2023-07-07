const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Неправильные почта или пароль'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new AuthorizationError('Неправильные почта или пароль'));
  }

  req.user = payload;
  next();
};
