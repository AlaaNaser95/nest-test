import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import {
  Injectable,
  UnauthorizedException,
  Dependencies,
} from "@nestjs/common";
import { AuthService } from "../auth/auth.service";

@Injectable()
@Dependencies(AuthService)
export class LocalAuthStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
