import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Color } from './color.model';
import { Product } from './product.model';

@Table({ tableName: 'product_color', createdAt: false, updatedAt: false })
export class ProductColor extends Model<ProductColor> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Color)
  @Column({ type: DataType.INTEGER })
  colorId: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;
}
