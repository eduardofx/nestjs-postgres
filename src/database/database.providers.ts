import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { Category } from './../categories/category.entity';
import { Wallet } from './../wallet/wallet.entity'
import { WalletMoviment } from './../walletmoviment/walletmoviment.entity'
import { ConfigService } from './../shared/config/config.service';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([User, Category, Wallet, WalletMoviment]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
