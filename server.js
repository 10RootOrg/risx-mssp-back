const express = require("express");
const logger = require('./logger');
const fs = require("fs");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const bodyParser = require("body-parser"); /// seco

const routes = require("./routes");
const dotenv = require("dotenv").config();
const app = express();

const front_ip = process.env.FRONT_IP || "";
const front_port = process.env.FRONT_PORT || 3003;
const front_url = process.env.FRONT_URL || "";
app.use((req, res, next) => {
  console.log("start req");
  next();
}); //

const { check_and_active_interval } = require('./controllers/ProcessController');
// check_and_active_interval(); //nof this is what you need to stop

console.log('backend got this front 1',`http://localhost:${front_port}` );
console.log('backend got this front 2',`http://${front_ip}:${front_port}` );
console.log('backend got this front 3',`${front_url}:${front_port}`);



app.use(
  cors({
    origin: [
      `http://localhost:${front_port}`,

      `http://${front_ip}:${front_port}`,

      `http://0.0.0.0:${front_port}`,
      `http://127.0.0.1:${front_port}`,
      `${front_url}:${front_port}`,
      `${front_ip}:${front_port}`,

    ],
    credentials: true,
  })
);
// app.use((req, res, next) => {
//   console.log("start 8888888");
//   next();
// });
app.use(express.json()); //parses incoming requests with JSON

app.use(bodyParser.json()); //
// app.use(express.urlencoded({ extended: false }));
// Middleware to log incoming requests
app.use((req, res, next) => {
    logger.request(req);
    next();
});

app.get('/', (req, res) => {
    logger.info('Received a GET request on /');
    res.send('Hello World');
});

app.use(routes);

const port = process.env.PORT || 5001;




app.listen(port, () => {
  console.log(`Backend Server run port ${port}`);
  logger.info(`Backend Server run port ${port}`);
});

process.on("exit", (code) => {
  // logPath ? WriteLog("End", code) : "";
  // if (isRestServerOn) {
  //   if (RestApiServerDavid.length >= 1) {
  //     for (let i = 0; i < RestApiServerDavid.length; i++) {
  //       RestApiServerDavid[i].res.send({ code: 5 });
  //     }
  //   }
  // }
  console.log("Exit Code of " + code);
});

 