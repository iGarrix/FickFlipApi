import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { existsSync } from 'fs';
import { join } from 'path';
import { of } from 'rxjs';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  @Get(':folder/:filename')
  getImage(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res,
  ) {
    const pathname = join(process.cwd(), `storage/${folder}/` + filename);
    if (!existsSync(pathname)) {
      throw new NotFoundException(['Image not found']);
    }
    try {
      return of(res.sendFile(pathname));
    } catch (error) {
      throw new BadRequestException(['Image is bad']);
    }
  }
  @Get('default')
  getDefImage(@Res() res) {
    const pathname = join(process.cwd(), `storage/noimage.jpg`);
    if (!existsSync(pathname)) {
      throw new NotFoundException(['Image not found']);
    }
    try {
      return of(res.sendFile(pathname));
    } catch (error) {
      throw new BadRequestException(['Image is bad']);
    }
  }
}
