import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ImagesController } from './images.controller';

// ServeStaticModule.forRoot({
//     rootPath: join(__dirname, './', 'storage'),
//   }),
@Module({
  imports: [],
  controllers: [ImagesController],
})
export class ImagesModule {}
