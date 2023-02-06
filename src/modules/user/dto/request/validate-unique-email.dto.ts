import { IsEmail, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class ValidateUniqueEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  userId?: number;

  constructor(email, userId?) {
    this.email = email;
    this.userId = userId;
  }
}
