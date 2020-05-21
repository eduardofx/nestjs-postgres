import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    ForeignKey,
    Unique,
    Length,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsTo,
} from 'sequelize-typescript';
import { Category } from '../categories/category.entity'
import { Wallet } from '../wallet/wallet.entity'
import { User } from '../users/user.entity'
import { Cash } from './../shared/enum/cash';

@Table({
    tableName: 'walletmoviment',
})
export class WalletMoviment extends Model<WalletMoviment> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        field: 'user_id',
    })
    userId: string;

    @ForeignKey(() => Category)
    @Column({
        type: 'integer',
        field: 'category_id',
    })
    categoryId: number;

    @ForeignKey(() => Wallet)
    @Column({
        type: 'integer',
        field: 'wallet_id',
    })
    walletId: number;


    @Column
    content: string;

    @Column({ type: DataType.DECIMAL(14, 2) })
    value: number;

    @Column({ type: DataType.ENUM(Cash.in, Cash.out) })
    cash: Cash

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;


    @BelongsTo(() => Category)
    category: Category;

    @BelongsTo(() => Wallet)
    wallet: Wallet;

    @BelongsTo(() => User)
    user: User;
}