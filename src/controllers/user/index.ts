import { Request, Response } from 'express';
import UserService from '../../services/user';

export default class AuthController {
  #UserService = new UserService();

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.#UserService.update(req.body);
      res.status(200).json({ message: 'Success!' });
    } catch (error) {
      res.status(error.status || 500).json({
        status: false,
        message: error.message,
      });
    }
  };
}
