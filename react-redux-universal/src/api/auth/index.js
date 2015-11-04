export function setupRoutes(app, prefix = '') {
  app.post(`${prefix}/login`, (req, res) => {
    res.json('done');
  });
};