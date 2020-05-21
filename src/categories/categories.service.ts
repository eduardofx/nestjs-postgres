import { User } from '../users/user.entity';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @Inject('CategoriesRepository')
        private readonly categoriesRepository: typeof Category,
    ) {}

    async findAll(): Promise<CategoryDto[]> {
        const categories = await this.categoriesRepository.findAll<Category>();
        return categories.map(category => {
            return new CategoryDto(category);
        });
    }

    async findOne(id: number): Promise<CategoryDto> {
        const category = await this.categoriesRepository.findByPk<Category>(id);
        if (!category) {
            throw new HttpException('No category found', HttpStatus.NOT_FOUND);
        }

        return new CategoryDto(category);
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new Category();
        category.title = createCategoryDto.title;

        try {
            return await category.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(
        id: number,
        updateCategoryDto: UpdateCategoryDto,
    ): Promise<Category> {
        const category = await this.categoriesRepository.findByPk<Category>(id);

        category.title = updateCategoryDto.title || category.title;

        try {
            return await category.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<Category> {
        const category = await this.categoriesRepository.findByPk<Category>(id);
        await category.destroy();
        return category;
    }
}
