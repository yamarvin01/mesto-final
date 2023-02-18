const allowedCors = [
  'http://localhost:3000',
  'http://yamarvin01.nomoredomains.club',
  'https://yamarvin01.nomoredomains.club',
];

function cors(req, res, next) {
  // Проверить есть ли хост среди разрешенных
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  // Указанным хостам разрешен любой метод и любой заголовок
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }

  next();
}

module.exports = cors;
