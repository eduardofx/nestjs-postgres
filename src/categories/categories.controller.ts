import {
    Controller,
    Req,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
} from '@nestjs/common';
import {
    ApiUseTags,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiImplicitParam,
} from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { Category as CategoryEntity} from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { Request } from 'express';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@ApiUseTags('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    @ApiOkResponse({ type: [CategoryDto] })
    findAll(): Promise<CategoryDto[]> {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: CategoryDto })
    @ApiImplicitParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<CategoryDto> {
        return this.categoriesService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: CategoryEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createCategorytDto: CreateCategoryDto,
        @Req() request,
    ): Promise<CategoryEntity> {
        return this.categoriesService.create(createCategorytDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: CategoryEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Req() request: Request,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<CategoryEntity> {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: CategoryEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('id', new ParseIntPipe()) id: number,
        @Req() request: Request,
    ): Promise<CategoryEntity> {
        return this.categoriesService.delete(id);
    }
}
