import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional,IsNumber } from 'class-validator';

export class UpdateWalletDto {
    @IsOptional()
    @ApiModelProperty()
    @IsNumber()
    readonly balance: number;
    
    @IsOptional()
    @ApiModelProperty()
    @IsNumber()
    readonly previousbalance: number;
}
