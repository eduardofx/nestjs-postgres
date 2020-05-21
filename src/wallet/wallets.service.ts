import { User } from '../users/user.entity';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './wallet.entity';
import { WalletDto } from './dto/wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsService {
    constructor(
        @Inject('WalletsRepository')
        private readonly walletsRepository: typeof Wallet,
    ) {}

    async findAll(): Promise<WalletDto[]> {
        const wallets = await this.walletsRepository.findAll<Wallet>({
            include: [User],
        });
        return wallets.map(wallet => {
            return new WalletDto(wallet);
        });
    }

    async findOne(id: number): Promise<WalletDto> {
        const wallet = await this.walletsRepository.findByPk<Wallet>(id, {
            include: [User],
        });
        if (!wallet) {
            throw new HttpException('No wallet found', HttpStatus.NOT_FOUND);
        }

        return new WalletDto(wallet);
    }

    async create(userId: string, createWalletDto: CreateWalletDto): Promise<Wallet> {
        const wallet = new Wallet();
        wallet.userId = userId;
        wallet.balance = createWalletDto.balance;
        wallet.previousbalance = createWalletDto.previousbalance;

        try {
            return await wallet.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getUserWallet(id: number, userId: string): Promise<Wallet> {
        const wallet = await this.walletsRepository.findByPk<Wallet>(id);
        
        if (!wallet) {
            throw new HttpException('No wallet found', HttpStatus.NOT_FOUND);
        }

        if (wallet.userId !== userId) {
            throw new HttpException(
                'You are unauthorized to manage this wallet',
                HttpStatus.UNAUTHORIZED,
            );
        }

        return wallet;
    }

    async update(
        id: number,
        userId: string,
        updateWalletDto: UpdateWalletDto,
    ): Promise<Wallet> {
        const wallet = await this.getUserWallet(id, userId);

        wallet.balance = updateWalletDto.balance || wallet.balance;
        wallet.previousbalance = updateWalletDto.previousbalance || wallet.previousbalance;

        try {
            return await wallet.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async delete(id: number, userId: string): Promise<Wallet> {
        const wallet = await this.getUserWallet(id, userId);
        await wallet.destroy();
        return wallet;
    }
}
