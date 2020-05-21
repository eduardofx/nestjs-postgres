import { Category } from './category.entity';

export const categoriesProviders = [{ provide: 'CategoriesRepository', useValue: Category }];
