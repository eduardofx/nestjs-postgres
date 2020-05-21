import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
    @IsOptional()
    @ApiModelProperty()
    @IsString()
    @Length(3, 60)
    readonly title: string;
}
