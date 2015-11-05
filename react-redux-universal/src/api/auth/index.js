import { login } from './auth';

export function setupRoutes(app, prefix = '') {
  app.post(`${prefix}/login`, (req, res) => {
    const { email, password } = req.body;

    console.log('  <====== login', email, password);

    login(email, password).then((err, response) => {
      if(err) {
        return res.status(401)
          .json(err);
      }

      res.json(response);
    });
  });
};