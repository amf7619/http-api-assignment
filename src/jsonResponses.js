const respond = (request, response, status, object, types) => {
  let responseObj;

  if (types[0] === 'text/xml') {
    responseObj = `<response> <message>${object.message}</message> <id>${object.id}</id> </response>`;
    response.writeHead(status, { 'Content-Type': 'text/xml' });
  } else {
    responseObj = JSON.stringify(object);
    response.writeHead(status, { 'Content-Type': 'application/json' });
  }
  response.write(responseObj);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respond(request, response, 200, responseJSON, acceptedTypes);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'Missing valid query parameter set to true',
    id: 'badRequest',
  };

  if (params.valid === 'true') respond(request, response, 200, responseJSON, acceptedTypes);
  else respond(request, response, 400, responseJSON, acceptedTypes);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
    id: 'unauthorized',
  };

  if (params.loggedIn === 'yes') respond(request, response, 200, responseJSON, acceptedTypes);
  else respond(request, response, 401, responseJSON, acceptedTypes);
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  respond(request, response, 403, responseJSON, acceptedTypes);
};

const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  respond(request, response, 500, responseJSON, acceptedTypes);
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  respond(request, response, 501, responseJSON, acceptedTypes);
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respond(request, response, 404, responseJSON, acceptedTypes);
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
