/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDto } from './dto/createProduct.dto';
import { Product } from './product.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    private fileService: FilesService,
  ) {}

  async getallproducts() {
    const products = await this.productRepository.findAll();
    return products;
  }

  async create(product: ProductDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const addProduct = await this.productRepository.create({
      ...product,
      price: Number(product.price),
      picture: fileName,
    });

    return addProduct;
  }
}
