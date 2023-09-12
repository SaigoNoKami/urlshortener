import { createServer } from 'http';
import * as express from 'express';
import  { Application } from 'express';
import * as cors from 'cors';
import { initRouters } from './router';
import  sequelize  = require('./database/postgre/db');

const app: express.Application = express();

app.use(express.json());
app.use(cors());

initRouters(app);
const bootstrap = async (app: Application) => {
  const server = createServer(app);
  
  
  try {
    sequelize.sync().catch(function (err) {
      console.log(err)
      process.exit(1)
    })
    server.listen(process.env.PORT, () => {
      console.log(`Server started on http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

bootstrap(app);

module.exports = app