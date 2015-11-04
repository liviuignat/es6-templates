import { requiredAuthenticated } from './../middleware';

export function setupRoutes(app, prefix = '') {
  app.get(`${prefix}/me`, requiredAuthenticated, (req, res) => {
    console.log(' <====== user', req.user);
    res.json(req.user);
  });
};