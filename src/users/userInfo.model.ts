import {
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './users.model';

const Gender: string[] = ['Male', 'Female', 'Other', 'Unknown'];

interface UserInfoCreationAttrs {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
}

@Table({ tableName: 'userInfo' })
export class UserInfo extends Model<UserInfo, UserInfoCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  userId: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  lastName: string;

  @Column({ type: DataType.ENUM(...Gender), allowNull: true })
  gender: string;

  @Column({ type: DataType.DATEONLY, allowNull: true })
  dateBirthday: Date;
}
