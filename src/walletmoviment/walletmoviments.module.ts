import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';

import { WalletMovimentsController } from './walletmoviments.controller';
import { WalletMovimentsService } from './walletmoviments.service';
import { walletMovimentsProviders } from './walletmoviments.providers';

import { WalletsModule } from '../wallet/wallets.module'
import { WalletsController } from '../wallet/wallets.controller';
import { WalletsService } from '../wallet/wallets.service';
import { walletsProviders } from '../wallet/wallets.providers';

@Module({
    imports: [DatabaseModule,WalletsModule],
    controllers: [WalletMovimentsController,WalletsController],
    providers: [WalletMovimentsService, ...walletMovimentsProviders,WalletsService,...walletsProviders],
    exports: [],
})
export class WalletMovimentsModule {}
