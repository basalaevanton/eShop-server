/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto/createProduct.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getallproducts();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: ProductDto, @UploadedFile() image) {
    return this.productsService.create(dto, image);
  }
}
