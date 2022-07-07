import { Op } from 'sequelize';
import Post from '../../repo/models/Post';
import User from '../../repo/models/User';
import { checkBody } from '../../utils';

interface IDeletePost {
  user: User;
  id: number;
}

interface ICreatePost {
  user: User;
  title: string;
  text: string;
}

interface IUpdatePost {
  user: User;
  title?: string;
  text?: string;
  id: number;
}

export default class PostService {
  create = async (opt: ICreatePost): Promise<{ id: number }> => {
    try {
      const data = checkBody(opt, [
        { name: 'title', type: 'string' },
        { name: 'text', type: 'string' },
      ]);
      if (data.title.length < 5 || data.title.length > 32) throw { status: 400, message: 'Invalid length of title' };
      if (data.text.length < 5 || data.text.length > 512) throw { status: 400, message: 'Invalid length of text' };

      if (!Object.keys(data).length) throw { status: 400, message: 'Not enough fields' };
      data.userId = opt.user.id;
      data.slug = opt.title.replace(/[ ]/gm, '-').toLowerCase();
      return { id: (await Post.create(data)).id };
    } catch (error) {
      throw error;
    }
  };

  delete = async (opt: IDeletePost): Promise<void> => {
    try {
      const { id } = opt.user;
      if (!opt.id) throw { status: 400, message: 'Not enough fields' };

      const post = await Post.findByPk(opt.id);
      if (!post) throw { status: 404, message: 'Post not found' };
      if (post.userId !== id) throw { status: 403, message: 'Only owner can delete a post' };

      await Post.destroy({ where: { id: opt.id } });
    } catch (error) {
      throw error;
    }
  };

  update = async (opt: IUpdatePost): Promise<void> => {
    try {
      if (!opt.id) throw { status: 400, message: 'Not enough fields' };

      const post = await Post.findByPk(opt.id);
      if (!post) throw { status: 404, message: 'Post not found' };
      if (post.userId !== opt.user.id) throw { status: 403, message: 'Only owner can delete a post' };

      const keys: Array<string> = ['title', 'text'];
      const data = {};
      let block = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const key in keys) {
        if (opt[keys[key]]) {
          if (opt[keys[key]].length < 5 && opt[keys[key]].length < 32)
            throw { status: 401, message: `Invalid length of ${keys[key]}` };

          data[keys[key]] = opt[keys[key]];
          block = false;
        }
      }

      await Post.update(data, { where: { id: opt.id } });
      if (block) throw { status: 400, message: 'Missing fields' };
    } catch (error) {
      throw error;
    }
  };

  getPostOfUser = async (id: string, page: number): Promise<{ posts: any }> => {
    try {
      const limitPost = 5;
      const skipPosts = page <= 1 ? 0 : (page - 1) * limitPost;
      if (!id) throw { status: 400, message: 'Not enough field id provided' };
      const user: User = await User.findOne({
        where: {
          shortLink: { [Op.iLike]: `%${id}%` },
        },
      });
      if (!user) throw { status: 404, message: 'User not found' };
      const posts = await Post.findAll({ where: { userId: user.id }, offset: skipPosts, limit: limitPost });
      if (posts.length === 0) throw { status: 404, message: 'Posts not found' };
      return { posts };
    } catch (error) {
      throw error;
    }
  };
}
