import {
    Body,
    Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req,
    UseGuards, UseInterceptors
} from "@nestjs/common";
import { JwtAuthGuard } from "../../authentication/guards/jwt-auth.guard";
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/request/create-product.dto";
import {UpdateProductDto} from "./dto/request/update-product.dto";
import {PaginationInterceptor} from "../../common/interceptors/pagination.interceptor";
import {PaginationRequestDto} from "../../common/dtos/request/pagination-request.dto";
import {PaginationResponseDto} from "../../common/dtos/response/pagination-response.dto";

@UseGuards(JwtAuthGuard)
@Controller("products")
export class ProductController {
    constructor(private productService: ProductService) {}


    @Post()
    public async create(
        @Req() req,
        @Body() createProductDto: CreateProductDto
    ) {
        return await this.productService.create(createProductDto);
    }

    @Get(":productId")
    public async getProduct(@Param("productId", ParseIntPipe) productId: number) {
        return await this.productService.getProduct(productId);
    }

    @Put(":productId")
    public async updateProduct(
        @Param("productId", ParseIntPipe) productId: number,
        @Body()
            updateProductDto: UpdateProductDto
    ) {
        return await this.productService.update(productId, updateProductDto);
    }

    @UseInterceptors(PaginationInterceptor)
    @Get()
    public async list(
        @Query() paginationRequestDto: PaginationRequestDto
    ): Promise<PaginationResponseDto> {
        return await this.productService.list(paginationRequestDto);
    }

    @Delete(":productId")
    public async delete( @Param("productId", ParseIntPipe) productId: number,
    ){
        return await this.productService.delete(productId);
    }
}
