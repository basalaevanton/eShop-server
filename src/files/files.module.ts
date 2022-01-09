import { FilesService } from './files.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
