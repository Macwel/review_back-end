import { Router } from 'express';
import AuthController from '../controllers/auth';

export default class IndexRouter {
  router = Router();

  #AuthController = new AuthController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/auth/login', this.#AuthController.login);
    this.router.post('/auth/register', this.#AuthController.register);
  }
}
