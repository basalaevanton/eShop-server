import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './users.model';

export const Gender: string[] = ['Male', 'Female', 'Other', 'Unknown'];

interface UserInfoCreationAttrs {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
}

@Table({ tableName: 'userInfo' })
export class UserInfo extends Model<UserInfo, UserInfoCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'UserId модели User' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  userId: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  lastName: string;

  @ApiProperty({ enum: Gender, example: 'Male', description: 'Пароль' })
  @Column({ type: DataType.ENUM(...Gender), allowNull: true })
  gender: string;

  @ApiProperty({ example: new Date(), description: 'День Рождение' })
  @Column({ type: DataType.DATE, allowNull: true })
  birthday: Date;
}
