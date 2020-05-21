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

@Table({
    tableName: 'category',
})
export class Category extends Model<Category> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Length({
        min: 3,
        max: 60,
        msg: `The length of category title can't be shorter than 3 and longer than 60 `,
    })
    @Column
    title: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;

}
