import {Product} from "../../../../database/entities/product.entity";
import * as moment from "moment";

export class ProductDto{
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly quantity: number;
    readonly referenceNumber: string;
    readonly createdAt: string;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.description= product.description;
        this.quantity = product.quantity;
        this.referenceNumber = product.referenceNumber;
        this.createdAt = moment(product.createdAt).format("YYYY-MMM-DD HH:mm");

    }
}