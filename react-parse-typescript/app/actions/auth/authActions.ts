import Parse from 'parse';

class AuthActions {
  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Parse.User.logOut();
      
      Parse.User.logIn(username, password, {
        success: (user: any) => {
          return resolve(user);
        },
        error: (user: any, error: any) => {
          return reject(error);
        }
      });
    });
  }
}

export default {
  authActions: new AuthActions()
};