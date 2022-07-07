// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-cycle */
import { Table, Column, Model, PrimaryKey, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';
import User from './User';

interface PostAttributes {
  id: number;
  userId: number | User;
  title: string;
  text: string;
  slug: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IPostCreationAttributes extends Optional<PostAttributes, 'id'> {}

@Table({
  timestamps: true,
  freezeTableName: true,
  tableName: 'post',
  underscored: true,
  modelName: 'Post',
  paranoid: true,
})
export default class Post extends Model<PostAttributes, IPostCreationAttributes> implements PostAttributes {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataTypes.BIGINT,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataTypes.STRING,
  })
  userId: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING(256),
  })
  title: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING(256),
  })
  text: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING(256),
  })
  slug: string;

  @ForeignKey(() => User)
  user_id: User;

  @BelongsTo(() => User)
  user: User;
}
