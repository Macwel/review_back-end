import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('pg').defaults.parseInt8 = true;

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: <Dialect>process.env.DB_DRIVER,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [`${__dirname}/models/*.ts`],
});

// Initialize models
// sequelize
//   .sync({ force: true })
//   // eslint-disable-next-line promise/always-return
//   .then(() => {
//     console.log('Tables have been created');
//   })
//   .catch(err => console.log(err));

export default sequelize;
