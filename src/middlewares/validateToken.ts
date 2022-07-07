import { NextFunction, Request, Response } from 'express';

import Iron from '@hapi/iron';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('Authorization')?.substring(7);

    if (!token) {
      throw {
        status: 401,
        message: 'Not found token',
      };
    }
    const decoded = await Iron.unseal(token, process.env.JWT_SECRET, Iron.defaults);

    req.body.user = decoded;

    next();
  } catch (error) {
    res.status(error.status || 500).json({
      status: false,
      message: error.message,
    });
  }
};
