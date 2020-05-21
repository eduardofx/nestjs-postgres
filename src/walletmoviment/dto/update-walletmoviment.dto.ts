import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional,IsNumber,IsEnum } from 'class-validator';
import { Cash } from './../../shared/enum/cash';

export class UpdateWalletMovimentDto {
    @IsOptional()
    @ApiModelProperty()
    @IsNumber()
    readonly walletId: number;
  
    @ApiModelProperty()
    @IsOptional()
    @IsEnum(Cash)
    readonly cash?: Cash;

    @IsOptional()
    @ApiModelProperty()
    @IsNumber()
    readonly value: number;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    readonly content: string;   

    @IsOptional()
    @ApiModelProperty()
    @IsNumber()
    readonly categoryrId: number;
}
