import { WalletMoviment } from './walletmoviment.entity';

export const walletMovimentsProviders = [{ provide: 'WalletMovimentsRepository', useValue: WalletMoviment }];
