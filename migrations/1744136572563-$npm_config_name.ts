import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveAudienceField1744136572563 implements MigrationInterface {
    name = 'RemoveAudienceField1744136572563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Проверяем существование колонки перед удалением
        const hasColumn = await queryRunner.hasColumn('tours', 'audience');
        if (hasColumn) {
            await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "audience"`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Проверяем отсутствие колонки перед добавлением
        const hasColumn = await queryRunner.hasColumn('tours', 'audience');
        if (!hasColumn) {
            await queryRunner.query(`ALTER TABLE "tours" ADD "audience" enum_audience NOT NULL DEFAULT 'family'`);
        }
    }
}
