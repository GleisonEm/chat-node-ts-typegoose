// import { DataSource } from "typeorm";
// import * as dotenv from "dotenv";
// import { User } from "../entities/mysql/User";
// import { UserCreate1654484866320 } from "../db/migrations/1654484866320-UserCreate";

// dotenv.config();

// export const MySqlDbDataSource = new DataSource({
//   type: "mysql",
//   host: process.env.MYSQL_DB_HOST,
//   port: Number(process.env.MYSQL_DB_PORT),
//   database: process.env.MYSQL_DB_DATABASE,
//   username: process.env.MYSQL_DB_USERNAME,
//   password: process.env.MYSQL_DB_PASSWORD,
//   entities: [User],
//   // insecureAuth: true
//   // migrationsTableName: "custom_migration_table",
//   // migrations: [UserCreate1654484866320],
// });

// MySqlDbDataSource.initialize()
//   .then(() => {
//     console.log("MySqlDbDataSource has been initialized!");
//   })
//   .catch((err) => {
//     if (err === "Connection lost: The server closed the connection.") {
//       MySqlDbDataSource.synchronize();
//     }
//     console.error("Error during MySqlDbDataSource initialization", err);
//   });
