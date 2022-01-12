import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'Почтовый адрес' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    description: 'Активирован аккаунт через почту',
  })
  @Column({ type: DataType.STRING, defaultValue: false, allowNull: false })
  isActivated: boolean;

  @ApiProperty({
    description: 'UUID для ссылки на активацию',
  })
  @Column({ type: DataType.STRING })
  activationLink: string;

  @ApiProperty({
    title: 'Token',
    description: 'User model include Token model on UserId',
    type: () => Token,
  })
  @HasOne(() => Token)
  token: Token;

  @ApiProperty({
    title: 'UserInfo',
    description: 'User model include UserInfo model on UserId',
    type: () => UserInfo,
  })
  @HasOne(() => UserInfo)
  userInfo: UserInfo;
}
