import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from "class-validator";

@Entity()
export class User extends Base {
  @Column("varchar", { unique: true, length: 100 })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column("varchar", { length: 50 })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column("varchar", { length: 50 })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  public getFullName() {
    return this.firstName + " " + this.lastName;
  }
}
