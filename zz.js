const express = require('express');
const app = express();
const router = require('express').Router();
router.route('*').all((req, res, next) => {
  console.log('req ip ', req.headers.origin);

  next();
});

const port = 7676;
app.use(router);
app.listen(port, () => {
  console.log(`Risx app listening at http://localhost:${port}`);
});
