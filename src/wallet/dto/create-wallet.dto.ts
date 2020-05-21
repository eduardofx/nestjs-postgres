import { ApiModelProperty } from '@nestjs/swagger';
import {IsNumber, IsNumberString } from 'class-validator';

export class CreateWalletDto {
    @ApiModelProperty()
    @IsNumber()
    readonly balance: number;

    @ApiModelProperty()
    @IsNumber()
    readonly previousbalance: number
}
