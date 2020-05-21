import { ApiModelProperty } from '@nestjs/swagger';
import { WalletMoviment } from '../walletmoviment.entity';

export class WalletMovimentDto {
    @ApiModelProperty()
    readonly id: number;
   
    @ApiModelProperty()
    readonly categoryrId: number;

    @ApiModelProperty()
    readonly categoryname: string;

    @ApiModelProperty()
    readonly walletId: number;

    @ApiModelProperty()
    readonly authorId: string;
    
    @ApiModelProperty()
    readonly authorFirstName: string;

    @ApiModelProperty()
    readonly authorLastName: string;
    
    @ApiModelProperty()
    readonly userId: number;

    @ApiModelProperty()
    readonly cash: string;

    @ApiModelProperty()
    readonly value: number;

    @ApiModelProperty()
    readonly content: string;

    @ApiModelProperty()
    readonly createdAt: Date;

    @ApiModelProperty()
    readonly updatedAt: Date;

    constructor(walletmoviment: WalletMoviment) {
        this.id = walletmoviment.id;
        this.walletId = walletmoviment.walletId;
        this.value = walletmoviment.value;
        this.content = walletmoviment.content;
        this.cash = walletmoviment.cash;
        this.categoryrId = walletmoviment.categoryId;
        this.authorId = walletmoviment.userId;
        this.authorFirstName = walletmoviment.user.firstName;
        this.authorLastName = walletmoviment.user.lastName;
        this.categoryname = walletmoviment.category.title;
        this.createdAt = walletmoviment.createdAt;
        this.updatedAt = walletmoviment.updatedAt;
    }
}
