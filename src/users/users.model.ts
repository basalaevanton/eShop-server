import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Token } from 'src/auth/token.model';
import { UserInfo } from './userInfo.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  activationLink: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, defaultValue: false, allowNull: false })
  isActivated: boolean;

  @Column({ type: DataType.STRING })
  activationLink: string;

  @HasOne(() => Token)
  token: Token;

  @HasOne(() => UserInfo)
  userInfo: UserInfo;
}
