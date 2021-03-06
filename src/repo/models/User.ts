// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-cycle */
import { Table, Column, Model, PrimaryKey, AllowNull, Unique, HasOne } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';
import Post from './Post';

interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  fullName: string;
  login: string;
  shortLink: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IUserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
  timestamps: true,
  freezeTableName: true,
  tableName: 'user',
  underscored: true,
  modelName: 'User',
  paranoid: true,
})
export default class User extends Model<UserAttributes, IUserCreationAttributes> implements UserAttributes {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataTypes.BIGINT,
    autoIncrement: true,
  })
  id: number;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataTypes.STRING,
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING(256),
  })
  password: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING(256),
  })
  fullName: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING(256),
  })
  login: string;

  @AllowNull(true)
  @Unique(true)
  @Column({
    type: DataTypes.STRING(100),
  })
  shortLink: string;

  @HasOne(() => Post)
  post_id: number;
}
