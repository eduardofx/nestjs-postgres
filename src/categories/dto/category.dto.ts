import { ApiModelProperty } from '@nestjs/swagger';
import { Category } from '../category.entity';

export class CategoryDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly title: string;


    @ApiModelProperty()
    readonly createdAt: Date;

    @ApiModelProperty()
    readonly updatedAt: Date;

    constructor(category: Category) {
        this.id = category.id;
        this.title = category.title;
        this.createdAt = category.createdAt;
        this.updatedAt = category.updatedAt;
    }
}
