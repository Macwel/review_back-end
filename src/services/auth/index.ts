import { Op } from 'sequelize';
import Iron from '@hapi/iron';
import is from 'is_js';
import bcrypt from 'bcrypt';
import User from '../../repo/models/User';
// User.sync({ alter: false });
import { checkBody } from '../../utils';

interface IRegister {
  email: string;
  password: string;
  login: string;
  fullName: string;
}

interface ILogin {
  email: string;
  password: string;
}

export default class AuthService {
  // eslint-disable-next-line consistent-return
  register = async (opt: IRegister) => {
    try {
      const data = checkBody(opt, [
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'login', type: 'string' },
        { name: 'fullName', type: 'string' },
      ]);

      if (!Object.keys(data).length) throw { status: 400, message: 'Not enough fields' };
      // можно расширить метод checkBody, чтобы не делать отдельную проверку на email
      data.email.toLowerCase();

      if (!is.email(data.email)) throw { status: 400, message: 'Invalid email' };

      const user: User = await User.findOne({
        where: {
          [Op.or]: [
            {
              email: { [Op.iLike]: `%${data.email}%` },
            },
            {
              login: { [Op.iLike]: `%${data.login}%` },
            },
          ],
        },
      });

      if (user) throw { status: 400, message: 'This email or login is already registered.' };

      data.password = await bcrypt.hash(data.password, Number(10));

      await User.create(data);

      // await user.reload({
      //   attributes: {
      //     exclude: ['password'],
      //   },
      // });

      return await Iron.seal(user, process.env.JWT_SECRET, Iron.defaults);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  // eslint-disable-next-line consistent-return
  login = async (opt: ILogin) => {
    try {
      const data = checkBody(opt, [
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
      ]);

      if (!Object.keys(data).length) throw { status: 400, message: 'Not enough fields' };

      const user: User = await User.findOne({
        where: {
          email: {
            [Op.iLike]: `%${data.email}%`,
          },
        },
      });

      if (!user) throw { status: 400, message: 'This email is not registered.' };
      const hashCompare = await bcrypt.compare(data.password, user.password);
      if (!hashCompare) {
        throw {
          status: 400,
          message: 'Invalid password.',
        };
      }

      await user.reload({
        attributes: {
          exclude: ['password'],
        },
      });

      return await Iron.seal(user, process.env.JWT_SECRET, Iron.defaults);
    } catch (error) {
      return error;
    }
  };
}
