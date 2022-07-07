import { Request, Response } from 'express';
import PostService from '../../services/post';

export default class PostController {
  #PostService = new PostService();

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.#PostService.create(req.body);
      res.status(200).json({ message: 'Success!', ...response });
    } catch (error) {
      res.status(error.status || 500).json({
        status: false,
        message: error.message,
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.#PostService.delete({ user: req.body.user, id: Number(req.query.id) });
      res.status(200).json({ message: 'Success!' });
    } catch (error) {
      res.status(error.status || 500).json({
        status: false,
        message: error.message,
      });
    }
  };
}