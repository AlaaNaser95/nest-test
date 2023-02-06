import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../../database/repositories/user.repository";
import { JwtAuthStrategy } from "../../authentication/strategies/jwt-auth.strategy";;

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtAuthStrategy],
  exports: [UserService, JwtAuthStrategy],
})
export class UserModule {}
