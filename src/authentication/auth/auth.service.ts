import { Injectable } from "@nestjs/common";
import { UserService } from "../../modules/user/user.service";
import { UserDto } from "../../modules/user/dto/response/user.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../database/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(user) {
    return await this.createToken(new UserDto(user));
  }

  async validateUser(username: string, password: string): Promise<User> {
    let conditions = {
      email: username,
    };
      conditions = Object.assign(conditions, {
        password: await this.userService.hashPassword(password),
      });
    return await this.userService.getUser(conditions);
  }

  async createToken(user: UserDto) {
    const payload = {
      sub: user.id,
    };
    await user.setAccessToken(this.jwtService.sign(payload));
    return {data:user};
  }

  async profile(user) {
    return {data:new UserDto(
      await this.userService.getUser(
        {
          id: user.id,
        },
      )
    )};
  }
}
