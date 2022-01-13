import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Token } from 'src/auth/token.model';
import { Product } from './product.model';

export const CategoryEnum: string[] = [
  'Accessories',
  'Denim',
  'Dresses',
  'Jackets',
  'Jeans',
  'Pants',
  'Shoes',
  'Shorts',
  'Skirts',
  'Sweaters',
  'Tops',
];

interface CategoryCreationAttrs {
  name: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    enum: CategoryEnum,
    example: 'Accessories',
    description: 'Category',
  })
  @Column({ type: DataType.ENUM(...CategoryEnum), allowNull: true })
  name: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @BelongsTo(() => Product)
  product: Product[];
}
