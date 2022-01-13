/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductDto } from './dto/createProduct.dto';
import { Product } from './models/product.model';
import { ProductsService } from './products.service';

@ApiTags('Продукты')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Получение всех продуктов' })
  @ApiResponse({ status: 200, type: Product })
  @Get()
  getProducts() {
    return this.productsService.getallproducts();
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  // @ApiCookieAuth()
  // @ApiOperation({ summary: 'Загрузка продукта' })
  // @ApiQuery({ type: Product })
  // @ApiResponse({ status: 200, type: Product })
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: ProductDto, @UploadedFile() image) {
      return this.productsService.create(dto, image);
  }
}
