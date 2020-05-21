import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { walletsProviders } from './wallets.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [WalletsController],
    providers: [WalletsService, ...walletsProviders],
    exports: [WalletsModule],
})
export class WalletsModule {}
