import { Request, Response } from 'express';
import AuthService from '../../services/auth';

export default class AuthController {
  #AuthService = new AuthService();

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = await this.#AuthService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(error.status || 500).json({
        status: false,
        message: error.message,
      });
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = await this.#AuthService.register(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(error.status || 500).json({
        status: false,
        message: error.message,
      });
    }
  };
}
