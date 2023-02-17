const allowedCors = [
  // Предполагается вести разработку под защищенным VPN
  'http://localhost:3000',

  // Здесь хост Access-Control-Allow-Origin
  'http://yamarvin01.nomoredomains.club',
  'https://yamarvin01.nomoredomains.club',

  // Эти хосты разрешать не обязательно
  'http://api.yamarvin01.nomoredomainsclub.ru',
  'https://api.yamarvin01.nomoredomainsclub.ru',
];

function cors(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }

  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
}

module.exports = cors;
