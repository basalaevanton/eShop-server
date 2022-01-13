import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Token } from 'src/auth/token.model';
import { ProductColor } from './product-color.model';
import { ProductSize } from './product-size.model';
import { Product } from './product.model';

interface SizeCreationAttrs {
  name: string;
}

@Table({ tableName: 'size', createdAt: false, updatedAt: false })
export class Size extends Model<Size, SizeCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @BelongsToMany(() => Product, () => ProductSize)
  product: Product[];
}
