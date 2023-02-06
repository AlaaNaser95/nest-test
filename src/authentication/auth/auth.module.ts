import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../../modules/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LocalAuthStrategy } from "../strategies/local-auth.strategy";
import { JwtAuthStrategy } from "../strategies/jwt-auth.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => await config.get("auth"),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalAuthStrategy, JwtAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
