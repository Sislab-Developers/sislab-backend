import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzlePostgresModule } from "@knaadh/nestjs-drizzle-postgres";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env.local",
    }),
    DrizzlePostgresModule.register({
      tag: "SISLAB_DB",
      postgres: {
        url: `postgresql://${process.env.DB_USER}@${process.env.DB_HOST}/${process.env.DB_NAME}?password=${process.env.DB_PASSWORD}`,
        config: {
          database: process.env.DB_NAME,
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
