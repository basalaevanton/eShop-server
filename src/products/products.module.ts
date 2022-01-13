import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { Category } from './models/category.model';
import { Color } from './models/color.model';
import { ProductColor } from './models/product-color.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Category, Color, ProductColor]),
    forwardRef(() => AuthModule),
    FilesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
