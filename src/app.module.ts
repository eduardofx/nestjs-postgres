import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { CategoriesModule } from './categories/categories.module'
import { WalletsModule}  from './wallet/wallets.module'
import { WalletMovimentsModule }from './walletmoviment/walletmoviments.module'

@Module({
    imports: [UsersModule,CategoriesModule,SharedModule,WalletsModule,WalletMovimentsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
