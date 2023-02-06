import { EntityRepository } from "typeorm";
import {BaseRepository} from "./base.repository";
import {Product} from "../entities/product.entity";

@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product > {
    constructor() {
        super(Product.name);
    }
}
