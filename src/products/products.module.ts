import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([Product]), FilesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
