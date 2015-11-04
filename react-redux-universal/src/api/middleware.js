import { Parse } from 'node-parse-api';
import config from './../config';

const parse = new Parse(config.parse.options);

function getUserFromSession(sessionToken) {
  return new Promise((resolve, reject) => {
    parse.me(sessionToken, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });
};

function getUserFromParse(parseUser) {
  const opt = parseUser || {};

  this.email = opt.email;
  this.emailVerified = opt.emailVerified;
  this.updatedAt = opt.updatedAt;
  this.firstName = opt.firstName;
  this.lastName = opt.lastName;
}

export function requestAuthToken(req, res, next) {
  const fromCookie = req.cookies.auth_token;
  const fromUrl = req.query.auth_token;
  const authHeader = req.get('Authorization');
  const fromHeader = authHeader ? authHeader.replace('Bearer ', '') : '';

  req.authToken = fromCookie || fromUrl || fromHeader;

  next();
}

export function userFromParse(req, res, next) {
  if (req.authToken) {
    getUserFromSession(req.authToken).then((user) => {
      req.user = getUserFromParse(user);
    }).catch(() => {
    }).then(() => {
      return next();
    });
  } else {
    return next();
  }
}

export function requiredAuthenticated(req, res, next) {
  if(!req.user) {
    return res
      .status(400)
      .send('Not authorized');
  }

  return next();
}