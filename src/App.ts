// import modules
import express, { Application } from 'express';
import { Sequelize } from 'sequelize-typescript';
import sequelize from './repo';

export default class App {
  sequelize: Sequelize;

  app: Application;

  port: number;

  constructor(config: { port: number; middlewares: any; routes: any }) {
    this.app = express();
    this.port = config.port;
    this.middlewares(config.middlewares);
    this.routes(config.routes);
    this.app.set('trust proxy', true);
    this.sequelize = sequelize;
  }

  private middlewares(middlewares: { forEach: (arg: (middleware: any) => void) => void }): void {
    middlewares.forEach(middleware => {
      this.app.use(middleware);
    });
  }

  private routes(routes: { forEach: (arg: (controller: any) => void) => void }): void {
    routes.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
