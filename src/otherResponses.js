const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getStatusCode = (request, response, acceptedTypes, headerText, messageText) => {
  const jsonObj = {
    header: headerText,
    message: messageText,
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <header>${jsonObj.header}</header>`;
    responseXML = `${responseXML} <message>${jsonObj.message}</message>`;
    responseXML = `${responseXML} <response>`;

    return respond(request, response, responseXML, 'text/xml');
  }

  const jsonString = JSON.stringify(jsonObj);
  return respond(request, response, jsonString, 'text/html');
};

const success = (request, response, acceptedTypes) => getStatusCode(request, response, acceptedTypes, 'Success', 'This is a successful response.');

const badRequest = (request, response, acceptedTypes) => getStatusCode(request, response, acceptedTypes, 'Bad Request', 'Missing valid query parameter set to true.');

const unauthorized = (request, response, acceptedTypes) => getStatusCode(request, response, acceptedTypes, 'Unauthorized', 'Missing loggedIn query parameter set to yes.');

const forbidden = (request, response, acceptedTypes) => getStatusCode(request, response, acceptedTypes, 'Forbidden', 'You do not have access to this content.');

const internal = (request, response, acceptedTypes) => getStatusCode(request, response, acceptedTypes, 'Internal Server Error', 'Internal Server Error. Something went wrong.');

const notImplemented = (request, response, acceptedTypes) => getStatusCode(request, response, acceptedTypes, 'Not Implemented', 'A get request for this page has not been implemented yet. Check again later for updated content.');

const notFound = (request, response, acceptedTypes) => getStatusCode(request, response, acceptedTypes, 'Resource Not Found', 'The page you are looking for was not found.');

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
