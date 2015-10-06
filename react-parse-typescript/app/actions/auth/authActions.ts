import Parse from 'parse';

class AuthActions {
  login(username: string, password: string) {
    console.log(username, password);
    Parse.User.logOut(); 
    Parse.User.logIn(username, password, {
      success: (user: any) => {
        console.log('success', user);
      },
      error: (user: any, error: any) => {
        console.log('error', user, error);
      }
    });
  }
}

export default {
  authActions: new AuthActions()
};