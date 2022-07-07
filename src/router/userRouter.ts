import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken';
import UserController from '../controllers/user';

export default class IndexRouter {
  router = Router();

  #UserController = new UserController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.put('/user/update', validateToken, this.#UserController.update);
  }
}
