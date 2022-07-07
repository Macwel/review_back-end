import is from 'is_js';
import User from '../../repo/models/User';

interface IUpdateUser {
  id: any;
  email?: string;
  password?: string;
  login?: string;
  fullName?: string;
  short_link?: string;
}

interface IUser extends IUpdateUser {
  user: IUpdateUser;
}

export default class UserService {
  // eslint-disable-next-line consistent-return
  update = async (opt: IUser) => {
    try {
      const keys: Array<string> = ['email', 'password', 'login', 'fullName', 'shortLink'];
      const data = {};
      let block = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const key in keys) {
        if (opt[keys[key]]) {
          if (opt[keys[key]].length < 5 && opt[keys[key]].length < 32)
            throw { status: 401, message: `Invalid length of ${keys[key]}` };

          if (opt.email) {
            if (!is.email(opt.email)) throw { status: 401, message: 'Invalid email' };
          }

          data[keys[key]] = opt[keys[key]];
          block = false;
        }
      }
      await User.update(data, { where: { id: opt.user.id } });
      if (block) throw { status: 400, message: 'Missing fields' };
    } catch (error) {
      throw error;
    }
  };
}
