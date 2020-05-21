import { ApiModelProperty } from '@nestjs/swagger';
import {IsNumber, IsString,IsOptional,IsEnum} from 'class-validator';
import { Cash } from './../../shared/enum/cash';

export class CreateWalletMovimentDto {
    @ApiModelProperty()
    @IsNumber()
    readonly walletId: number;

    @ApiModelProperty()
    @IsOptional()
    @IsEnum(Cash)
    readonly cash: Cash;

    @ApiModelProperty()
    @IsString()
    readonly value: number;

    @ApiModelProperty()
    @IsString()
    readonly content: string;   

    @ApiModelProperty()
    @IsNumber()
    readonly categoryrId: number;
}
