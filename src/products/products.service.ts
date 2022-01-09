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

  async create(product: ProductDto, picture: any) {
    const fileName = await this.fileService.createFile(picture);
    const addProduct = await this.productRepository.create({
      ...product,
      picture: fileName,
    });
    console.log(fileName);
    return addProduct;
  }
}
