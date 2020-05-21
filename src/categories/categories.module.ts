import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { categoriesProviders } from './categories.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [CategoriesController],
    providers: [CategoriesService, ...categoriesProviders],
    exports: [],
})
export class CategoriesModule {}
