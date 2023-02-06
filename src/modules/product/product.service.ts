import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductRepository} from "../../database/repositories/product.repository";
import {ProductDto} from "./dto/response/product.dto";
import {PaginationResponseDto} from "../../common/dtos/response/pagination-response.dto";
import {Brackets} from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,
    ) {
    }
    async create(createProductDto){
        const product = await this.productRepository.save({...createProductDto, referenceNumber:Date.now()})
         return {message: "product has been created successfully",data:new ProductDto(product)};
    }

    async getProduct(productId){
        const product = await this.productRepository.findOneOrException({id: productId});
        return {data: new ProductDto(product)};
    }

    async update(productId,updateProductDto){
        let product  =  await this.productRepository.findOneOrException({id: productId});
        product  =await this.productRepository.save({...product,...updateProductDto});
        return {message : "Product has been updated successfully", data: new ProductDto(product)};
    }

     async delete(productId){
        await this.productRepository.softDelete(productId);
        return {message:"Product has been deleted successfully"};
     }

    async list(paginationRequestDto): Promise<PaginationResponseDto> {
        const {page, limit, sort, search} = paginationRequestDto;
        let query = await this.productRepository
            .createQueryBuilder("product");
        if (search) {
            await query.andWhere(
                new Brackets((qb) => {
                    qb.where("product.name like :name", {
                        name: `%${search}%`,
                    })
                        .orWhere("product.description like :description", {description: `%${search}%`})
                })
            );
        }
        const [products, count] = await query
            .take(limit)
            .skip(limit * (page - 1))
            .orderBy("product.id", sort)
            .getManyAndCount();
        return new PaginationResponseDto(
            products.map((product) => {
                return new ProductDto(product);
            }),
            count
        );
    }
}