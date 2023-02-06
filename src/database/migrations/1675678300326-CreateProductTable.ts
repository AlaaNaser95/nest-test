import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProductTable1675678300326 implements MigrationInterface {
    name = 'CreateProductTable1675678300326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`quantity\` int NOT NULL DEFAULT '0', \`referenceNumber\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_171752c58d15b623e518ba15e9\` (\`referenceNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_171752c58d15b623e518ba15e9\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
