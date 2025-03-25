import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBirthdayToProfile1742938086828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" ADD "birthday" date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "birthday"`);
    }

}
