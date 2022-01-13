import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Token } from 'src/auth/token.model';
import { Category } from './category.model';
import { ProductColor } from './product-color.model';
import { Color } from './color.model';

interface ProductCreationAttrs {
  name: string;
  price: number;
  image: string;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @HasOne(() => Category)
  category: Category;

  // @BelongsToMany(() => , () => )
  // sizes: [];

  @BelongsToMany(() => Color, () => ProductColor)
  color: Color[];
}

// @ApiProperty({
//   title: 'UserInfo',
//   description: 'User model include UserInfo model on UserId',
//   type: () => UserInfo,
// })
// @HasOne(() => UserInfo)
// userInfo: UserInfo;
