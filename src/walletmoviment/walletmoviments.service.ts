import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Wallet } from '../wallet/wallet.entity'

import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateWalletMovimentDto } from './dto/create-walletmoviment.dto';
import { WalletMoviment } from './walletmoviment.entity';
import { WalletMovimentDto } from './dto/walletmoviment.dto';
import { UpdateWalletMovimentDto } from './dto/update-walletmoviment.dto';

@Injectable()
export class WalletMovimentsService {
    constructor(
        @Inject('WalletMovimentsRepository')
        private readonly walletmovimentsRepository: typeof WalletMoviment,

        @Inject('WalletsRepository')
        private readonly walletsRepository: typeof Wallet
    ) {}

    async findAll(): Promise<WalletMovimentDto[]> {
        const walletmoviments = await this.walletmovimentsRepository.findAll<WalletMoviment>({
            include: [Category,Wallet,User]
        });
        return walletmoviments.map(walletmoviments => {
            return new WalletMovimentDto(walletmoviments);
        });
    }

    async findOne(id: number): Promise<WalletMovimentDto> {
        const wallet = await this.walletmovimentsRepository.findByPk<WalletMoviment>(id, {
            include: [Category,Wallet,User]
        });
        if (!wallet) {
            throw new HttpException('No wallet found', HttpStatus.NOT_FOUND);
        }

        return new WalletMovimentDto(wallet);
    }

    async create(userId: string, createWalletMovimentDtoDto: CreateWalletMovimentDto): Promise<WalletMoviment> {
        const walletMoviment = new WalletMoviment();
        walletMoviment.userId = userId;
        walletMoviment.categoryId = createWalletMovimentDtoDto.categoryrId;
        walletMoviment.walletId = createWalletMovimentDtoDto.walletId;        
        walletMoviment.value = createWalletMovimentDtoDto.value;
        walletMoviment.content = createWalletMovimentDtoDto.content;
        walletMoviment.cash = createWalletMovimentDtoDto.cash;

        
        
        const wallet = await this.walletsRepository.findByPk<Wallet>(walletMoviment.walletId);
        const previousbalance = wallet.balance;       
        wallet.previousbalance = previousbalance;

        if(walletMoviment.cash == 'in'){
            wallet.balance =  Number(wallet.balance) +  Number(createWalletMovimentDtoDto.value);
        }
        if(walletMoviment.cash == 'out'){
            wallet.balance = Number(wallet.balance) - Number(createWalletMovimentDtoDto.value);
        }
        
       
        try {
            await wallet.save();
            return await walletMoviment.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getUserWalletMoviment(id: number, userId: string): Promise<WalletMoviment> {
        const walletMoviment = await this.walletmovimentsRepository.findByPk<WalletMoviment>(id);
        
        if (!walletMoviment) {
            throw new HttpException('No wallet found', HttpStatus.NOT_FOUND);
        }

        if (walletMoviment.userId !== userId) {
            throw new HttpException(
                'You are unauthorized to manage this wallet',
                HttpStatus.UNAUTHORIZED,
            );
        }

        return walletMoviment;
    }

    async update(
        id: number,
        userId: string,
        updateWalletDto: UpdateWalletMovimentDto,
    ): Promise<WalletMoviment> {
        const walletMoviment = await this.getUserWalletMoviment(id, userId);

        walletMoviment.walletId = updateWalletDto.walletId || walletMoviment.walletId;
        walletMoviment.categoryId = updateWalletDto.categoryrId || walletMoviment.categoryId;
        walletMoviment.content = updateWalletDto.content || walletMoviment.content;
        walletMoviment.cash = updateWalletDto.cash || walletMoviment.cash;
        walletMoviment.value = updateWalletDto.value || walletMoviment.value;


        const wallet = await this.walletsRepository.findByPk<Wallet>(walletMoviment.walletId);
        const previousbalance = wallet.balance;       
        wallet.previousbalance = previousbalance;

        if(walletMoviment.cash == 'in'){
            wallet.balance = Number(wallet.balance) + Number(updateWalletDto.value) || Number(walletMoviment.value);
        }
        if(walletMoviment.cash == 'out'){
            wallet.balance = Number(wallet.balance) - Number(updateWalletDto.value) || Number(walletMoviment.value);
        }
          

        try {
            await wallet.save();
            return await walletMoviment.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async delete(id: number, userId: string): Promise<WalletMoviment> {
        const walletMoviment = await this.getUserWalletMoviment(id, userId);
        await walletMoviment.destroy();
        return walletMoviment;
    }
}
