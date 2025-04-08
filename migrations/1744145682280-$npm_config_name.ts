import { MigrationInterface, QueryRunner } from "typeorm";

export class AddServicesAndItineraryToTour1744145682280 implements MigrationInterface {
    name = 'AddServicesAndItineraryToTour1744145682280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Проверяем существование колонки services перед добавлением
        const hasServicesColumn = await queryRunner.hasColumn('tours', 'services');
        if (!hasServicesColumn) {
            await queryRunner.query(`ALTER TABLE "tours" ADD "services" text NULL`);
        }

        // Проверяем существование колонки itinerary перед добавлением
        const hasItineraryColumn = await queryRunner.hasColumn('tours', 'itinerary');
        if (!hasItineraryColumn) {
            await queryRunner.query(`ALTER TABLE "tours" ADD "itinerary" jsonb NULL DEFAULT '[]'::jsonb`);
        } else {
            // Если колонка существует, но возможно содержит null, установим для неё значение по умолчанию
            await queryRunner.query(`UPDATE "tours" SET "itinerary" = '[]'::jsonb WHERE "itinerary" IS NULL`);
            await queryRunner.query(`ALTER TABLE "tours" ALTER COLUMN "itinerary" SET DEFAULT '[]'::jsonb`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "itinerary"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "services"`);
    }
}
