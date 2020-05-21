import { Wallet } from './wallet.entity';

export const walletsProviders = [{ provide: 'WalletsRepository', useValue: Wallet }];
