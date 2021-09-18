const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getStatusCode = (request, response, acceptedTypes, status, contentObj) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <header>${contentObj.header}</header>`;
    responseXML = `${responseXML} <message>${contentObj.message}</message>`;
    responseXML = `${responseXML} <response>`;

    return respond(request, response, status, responseXML, 'text/xml');
  }

  const jsonString = JSON.stringify(contentObj);
  return respond(request, response, status, jsonString, 'application/json');
};

const success = (request, response, acceptedTypes) => {
  const responseObj = {
    header: 'Success',
    message: 'This is a successful response.',
  };

  getStatusCode(request, response, acceptedTypes, 200, responseObj);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseObj = {
    header: 'Bad Request',
    message: 'This request has the required parameters.',
  };

  if (!params.valid || params.valid !== 'true') {
    responseObj.message = 'Missing valid query parameter set to true.';
    responseObj.id = 'badRequest';

    return getStatusCode(request, response, acceptedTypes, 400, responseObj);
  }

  return getStatusCode(request, response, acceptedTypes, 200, responseObj);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseObj = {
    header: 'Unauthorized',
    message: 'You have successfully viewed the content.',
  };

  if (!params.valid || params.loggedIn !== 'yes') {
    responseObj.message = 'Missing loggedIn query parameter set to yes.';
    responseObj.id = 'unauthorized';

    return getStatusCode(request, response, acceptedTypes, 401, responseObj);
  }

  return getStatusCode(request, response, acceptedTypes, 200, responseObj);
};

const forbidden = (request, response, acceptedTypes) => {
  const responseObj = {
    header: 'Forbidden',
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  return getStatusCode(request, response, acceptedTypes, 403, responseObj);
};

const internal = (request, response, acceptedTypes) => {
  const responseObj = {
    header: 'Internal Server Error',
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  getStatusCode(request, response, acceptedTypes, 500, responseObj);
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseObj = {
    header: 'Not Implemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'internalError',
  };

  getStatusCode(request, response, acceptedTypes, 501, responseObj);
};

const notFound = (request, response, acceptedTypes) => {
  const responseObj = {
    header: 'Resource Not Found',
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  getStatusCode(request, response, acceptedTypes, 404, responseObj);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
