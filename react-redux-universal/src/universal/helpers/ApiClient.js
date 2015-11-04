import superagent from 'superagent';
import config from './../../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    // return 'http://localhost:' + config.apiPort + adjustedPath;
    return 'http://' + `localhost:${config.port}/api${adjustedPath}`;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, requestData = {}) => {
        const { params, data } = requestData;

        return new Promise((resolve, reject) => {
          const request = superagent[method](formatUrl(path));

          if (params) {
            request.query(params);
          }

          // Copy all headers to the new request
          if (__SERVER__ && req.headers) {
            Object.keys(req.headers)
              .forEach((key) => request.set(key, req.headers[key]));
          }

          if (data) {
            request.send(data);
          }

          request.end((err, { body, status } = {}) => {
            console.info('  <===== API CLIENT', formatUrl(path), err, body, status);
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
