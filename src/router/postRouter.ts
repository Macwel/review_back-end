import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken';
import PostController from '../controllers/posts';

export default class PostRouter {
  router = Router();

  #PostController = new PostController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/post/create', validateToken, this.#PostController.create);
    this.router.post('/post/delete', validateToken, this.#PostController.delete);
    this.router.put('/post/update', validateToken, this.#PostController.update);
  }
}
