import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import AuthConfig from "./config/auth/auth.config";
import { Connection } from "typeorm";
import DatabaseConfig from "./config/database/database.config";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./authentication/auth/auth.module";
import {ProductModule} from "./modules/product/product.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [DatabaseConfig, AuthConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => await config.get("database"),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ProductModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
