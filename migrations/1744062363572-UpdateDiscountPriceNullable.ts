import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDiscountPriceNullable1744062363572 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \"tours\" ALTER COLUMN \"discountPrice\" TYPE DECIMAL(10,2), ALTER COLUMN \"discountPrice\" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \"tours\" ALTER COLUMN \"discountPrice\" TYPE DECIMAL(10,2), ALTER COLUMN \"discountPrice\" SET NOT NULL`);
    }

}
