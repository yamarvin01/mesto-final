// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'localhost:4000',
  'http://yamarvin01.nomoredomains.club',
  'https://yamarvin01.nomoredomains.club',
  'yamarvin01.nomoredomains.club',
  'www.yamarvin01.nomoredomains.club',
];

function cors(req, res, next) {
  // const { origin } = req.headers;
  // if (allowedCors.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', '*');
  // }
  res.header('Access-Control-Allow-Origin', '*');

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
