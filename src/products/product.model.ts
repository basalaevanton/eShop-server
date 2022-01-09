import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Token } from 'src/auth/token.model';



interface ProductCreationAttrs {
  name: string;
  category: string;
  size: string;
  color: string;
  price: number;
  picture: string;
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

  @Column({ type: DataType.STRING, allowNull: false })
  category: string;
  @Column({ type: DataType.STRING, allowNull: false })
  size: string;
  @Column({ type: DataType.STRING, allowNull: false })
  color: string;
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;
  @Column({ type: DataType.STRING, allowNull: false })
  picture: string;
}
