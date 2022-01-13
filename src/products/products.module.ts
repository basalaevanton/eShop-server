import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

import {
  Product,
  Category,
  Color,
  ProductColor,
  Size,
  ProductSize,
} from './models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      Category,
      Color,
      ProductColor,
      Size,
      ProductSize,
    ]),
    forwardRef(() => AuthModule),
    FilesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
