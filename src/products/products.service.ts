/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDto } from './dto/createProduct.dto';
import { Product } from './models/product.model';
import { FilesService } from '../files/files.service';
import { ProductColor } from './models/product-color.model';
import { Color } from './models/color.model';
import { Category } from './models/category.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    @InjectModel(Color) private colorRepository: typeof Color,
    @InjectModel(ProductColor)
    private productColorRepository: typeof ProductColor,
    @InjectModel(Category) private categoryRepository: typeof Category,
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

    const Product = await this.productRepository.create({
      name: product.name,
      price: Number(product.price),
      image: fileName,
    });

    Product.$add('color', Color[0].id);

    const Category = await this.categoryRepository.create({
      name: product.category,
      productId: Product.id,
    });

    return Product;
  }
}
