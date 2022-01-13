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
import { Product } from './product.model';

export const ColorEnum: string[] = [
  'Red',
  'White',
  'Yellow',
  'Purple',
  'Brown',
  'Green',
  'Orange',
  'Black',
  'Blue',
];
interface ColorCreationAttrs {
  name: string;
}

@Table({ tableName: 'color' })
export class Color extends Model<Color, ColorCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    enum: Color,
    example: 'Green',
    description: 'Color',
  })
  @Column({ type: DataType.ENUM(...ColorEnum), allowNull: true })
  name: string;

  @BelongsToMany(() => Product, () => ProductColor)
  product: Product[];
}
