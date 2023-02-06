import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";
import {
    IsInt,
    IsNotEmpty, IsOptional,
    IsString,
} from "class-validator";

@Entity()
export class Product extends Base {
    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column({nullable:true})
    @IsString()
    @IsOptional()
    description: string;

    @Column({default:0})
    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @Column({ unique: true})
    @IsString()
    @IsNotEmpty()
    referenceNumber: string
}
