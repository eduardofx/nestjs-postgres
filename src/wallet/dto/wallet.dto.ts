import { ApiModelProperty } from '@nestjs/swagger';
import { Wallet } from '../wallet.entity';

export class WalletDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly authorId: string;

    @ApiModelProperty()
    readonly authorFirstName: string;

    @ApiModelProperty()
    readonly authorLastName: string;

    @ApiModelProperty()
    readonly balance: number;

    @ApiModelProperty()
    readonly previousbalance: number;

    @ApiModelProperty()
    readonly createdAt: Date;

    @ApiModelProperty()
    readonly updatedAt: Date;

    constructor(wallet: Wallet) {
        this.id = wallet.id;
        this.authorId = wallet.userId;
        this.authorFirstName = wallet.user.firstName;
        this.authorLastName = wallet.user.lastName;
        this.balance = wallet.balance;
        this.previousbalance = wallet.previousbalance;
        this.createdAt = wallet.createdAt;
        this.updatedAt = wallet.updatedAt;
    }
}
