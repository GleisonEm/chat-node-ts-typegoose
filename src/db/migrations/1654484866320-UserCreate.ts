import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserCreate1654484866320 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "name",
            type: "char",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "phone",
            type: "varchar",
          },
          {
            name: "registration_code",
            type: "varchar",
            default: null,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "token",
            type: "varchar",
            default: null,
          },
          {
            name: "type",
            type: "varchar",
            default: null,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
