import * as Parse from 'parse';
import { cookieService } from './../cookieService/cookieService';

const COOKIE_NAME = 'auth_token';

export function getCurrentUser() {
  const cookie = cookieService.getCookie(COOKIE_NAME);
  if (!cookie) {
    logOut();
    return null;
  }

  const { attributes } = Parse.User.current() || {};
  return attributes;
}

export function getCurrentAuthSession() {
  const parseUser = Parse.User.current();
  return parseUser ? parseUser.getSessionToken() : null;
}

export function logIn(email, password) {
  Parse.User.logOut();
  return new Promise((resolve, reject) => {
    Parse.User.logIn(email, password, {
      success: (user) => {
        setUserCookie(user);
        return resolve(getUserFromParse(user));
      },
      error: (user, error) => {
        return reject(error);
      }
    });
  });
}

export function logOut() {
  Parse.User.logOut();
  cookieService.deleteCookie(COOKIE_NAME);
  return Promise.resolve();
}

function setUserCookie(user) {
  const exdays = 10000;
  const cname = COOKIE_NAME;
  const cvalue = user.attributes.sessionToken;
  const expires = exdays * 24 * 60 * 60 * 1000;

  cookieService.setCookie({
    name: cname,
    value: cvalue,
    expires: expires
  });
}

function getUserFromParse(parseUser) {
  return {
    email: parseUser.email,
    emailVerified: parseUser.emailVerified,
    updatedAt: parseUser.updatedAt,
    firstName: parseUser.firstName,
    lastName: parseUser.lastName
  };
}

