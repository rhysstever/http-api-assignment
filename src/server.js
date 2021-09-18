const http = require('http');
const url = require('url');
const htmlResponseHandler = require('./htmlResponses.js');
const otherResponseHandler = require('./otherResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlResponseHandler.getIndex,
  '/success': otherResponseHandler.success,
  '/badRequest': otherResponseHandler.badRequest,
  '/unauthorized': otherResponseHandler.unauthorized,
  '/forbidden': otherResponseHandler.forbidden,
  '/internal': otherResponseHandler.internal,
  '/notImplemented': otherResponseHandler.notImplemented,
  '/notFound': otherResponseHandler.notFound,
  index: htmlResponseHandler.getIndex,
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, acceptedTypes);
  } else {
    urlStruct.index(request, response);
  }
};

http.createServer(onRequest).listen(port);
