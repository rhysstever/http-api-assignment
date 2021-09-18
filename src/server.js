const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlResponseHandler = require('./htmlResponses.js');
const otherResponseHandler = require('./otherResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlResponseHandler.getIndex,
  '/style.css': htmlResponseHandler.getCSS,
  '/success': otherResponseHandler.success,
  '/badRequest': otherResponseHandler.badRequest,
  '/unauthorized': otherResponseHandler.unauthorized,
  '/forbidden': otherResponseHandler.forbidden,
  '/internal': otherResponseHandler.internal,
  '/notImplemented': otherResponseHandler.notImplemented,
  notFound: otherResponseHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedURL.query);

  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);
