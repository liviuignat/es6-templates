import superagent from 'superagent';
import { currentUserService } from './../../client';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path, req) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    const host = req('host');
    return 'http://' + `${host}/api${adjustedPath}`;
  }
  return '/api' + adjustedPath;
}

class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, requestData = {}) => {
        const { params, data } = requestData;

        return new Promise((resolve, reject) => {
          const request = superagent[method](formatUrl(path, req));

          if (params) {
            request.query(params);
          }

          if (__SERVER__) {
            // Copy all headers to the new request
            Object.keys(req.headers || {})
              .forEach((key) => request.set(key, req.headers[key]));
          } else {
            const authSession = currentUserService.getCurrentAuthSession();
            if (authSession) {
              request.set('Authorization', `Bearer ${authSession}`);
            }
          }

          if (data) {
            request.send(data);
          }

          request.end((err, { body } = {}) => {
            if (err) {
              return reject(body || err);
            }

            resolve(body);
          });
        });
      });
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
