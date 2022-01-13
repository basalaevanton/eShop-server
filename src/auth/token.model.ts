import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';

interface TokenCreationAttrs {
  userId: number;
  refreshToken: string;
}

@Table({ tableName: 'token' })
export class Token extends Model<Token, TokenCreationAttrs> {
  @ApiProperty({ description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'UserId' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({ description: 'Refresh Token' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  refreshToken: string;
}
