import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMaxParticipantsToTour1744141175201 implements MigrationInterface {
    name = 'AddMaxParticipantsToTour1744141175201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Проверяем существование колонки перед добавлением
        const hasColumn = await queryRunner.hasColumn('tours', 'maxParticipants');
        if (!hasColumn) {
            await queryRunner.query(`ALTER TABLE "tours" ADD "maxParticipants" integer NOT NULL DEFAULT 0`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "maxParticipants"`);
    }
}
