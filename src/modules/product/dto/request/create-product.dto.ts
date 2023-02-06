import {
IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    @IsNotEmpty()
    quantity: number;
}
