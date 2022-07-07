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

export default class PostService {
  create = async (opt: ICreatePost): Promise<{ id: number }> => {
    try {
      const data = checkBody(opt, [
        { name: 'title', type: 'string' },
        { name: 'text', type: 'string' },
      ]);

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

      const post = await Post.findOne({ where: { id: opt.id } });
      if (!post) throw { status: 404, message: 'Post not found' };
      if (post.userId !== id) throw { status: 403, message: 'Only owner can delete a post' };

      await Post.destroy({ where: { id: opt.id } });
    } catch (error) {
      throw error;
    }
  };
}
