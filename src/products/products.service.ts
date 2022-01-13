/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDto } from './dto/createProduct.dto';
import { FilesService } from '../files/files.service';
import {
  Product,
  Color,
  Category,
  ProductColor,
  Size,
  ProductSize,
} from './models';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    @InjectModel(Color) private colorRepository: typeof Color,
    @InjectModel(ProductColor)
    private colorProductRepository: typeof ProductColor,
    @InjectModel(Size) private sizeRepository: typeof Size,
    @InjectModel(ProductSize) private sizeProductRepository: typeof ProductSize,
    @InjectModel(Category)
    private categoryRepository: typeof Category,

    private fileService: FilesService,
  ) {}

  async getallproducts() {
    const products = await this.productRepository.findAll({
      include: { all: true },
    });
    return products;
  }

  async create(product: ProductDto, image: any) {
    const fileName = await this.fileService.createFile(image);

    const Color = await this.colorRepository.findOrCreate({
      where: { name: product.color },
      defaults: {
        name: product.color,
      },
    });

    const Size = await this.sizeRepository.findOrCreate({
      where: { name: product.size },
      defaults: {
        name: product.size,
      },
    });

    const Product = await this.productRepository.create({
      name: product.name,
      price: Number(product.price),
      image: fileName,
    });

    const Category = await this.categoryRepository.create({
      name: product.category,
      productId: Product.id,
    });
    if (Category && Product && Size && Color) {
      await Product.$add('color', Color[0].id);
      await Product.$add('size', Size[0].id);
      return new HttpException(
        'Товар успешно добавлен в базу данных',
        HttpStatus.OK,
      );
    }
    throw new HttpException(
      'Произошла ошибка с загрузкой товара',
      HttpStatus.BAD_REQUEST,
    );
  }
}
