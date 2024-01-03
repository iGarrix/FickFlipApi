import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatePositionDto } from 'src/domain/dtos/positionDtos/create-position.dto';
import { PositionCategory } from '@prisma/client';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Guid } from 'guid-typescript';

export const storage = {
  storage: diskStorage({
    destination: './storage/position_images',
    filename: (req, file, cb) => {
      const filename: string = Guid.create().toString();
      const extension: string = extname(file.originalname).toLowerCase();
      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('positions')
@Controller('positions')
export class PositionsController {
  constructor(private readonly _serv: PositionsService) {}

  @Get()
  @ApiQuery({
    name: 's',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'ca',
    type: String,
    required: false,
  })
  async getAllPositions(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('ca') category: PositionCategory,
    @Query('s') search?: string,
  ) {
    try {
      return await this._serv.getAllPositionsAsync(
        take,
        page,
        category,
        search,
      );
    } catch (error) {
      throw new BadRequestException(['Occured error using search queries']);
    }
  }

  @Get('getbycode')
  async getPositionByCode(@Query('code') code: string) {
    return await this._serv.getPositionByCodeClientAsync(code);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 5, storage))
  @UsePipes(new ValidationPipe())
  async createPositon(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreatePositionDto,
  ) {
    const fileImagesToCreate = files.map((item) => {
      return { src: item.filename };
    });
    return await this._serv.createPositionAsync(body, fileImagesToCreate);
  }

  @Delete('delete')
  async deletePosition(@Query('code') code: string) {
    return await this._serv.deletePositionAsync(code);
  }
}
