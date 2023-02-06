import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/request/create-user.dto";
import { PaginationInterceptor } from "../../common/interceptors/pagination.interceptor";
import { PaginationResponseDto } from "../../common/dtos/response/pagination-response.dto";
import { JwtAuthGuard } from "../../authentication/guards/jwt-auth.guard";
import { UpdateUserDto } from "./dto/request/update-user.dto";
import { ValidateUniqueEmailDto } from "./dto/request/validate-unique-email.dto";
import {PaginationRequestDto} from "../../common/dtos/request/pagination-request.dto";

@UseGuards(JwtAuthGuard)
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post("users")
  public async create(
    @Req() req,
    @Body() createUserDTO: CreateUserDto
  ){
    return await this.userService.create(req, createUserDTO);
  }

  @Get("users/:userId")
  public async getUser(@Param("userId", ParseIntPipe) userId: number) {
    return await this.userService.viewUser(userId);
  }

  @Put("users/:userId")
  public async updateUser(
    @Param("userId", ParseIntPipe) userId: number,
    @Body()
    updateUserDto: UpdateUserDto
  ) {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Post("users/validate-email")
  public async validateUniqueEmail(
    @Body()
    validateUniqueEmailDto: ValidateUniqueEmailDto
  ) {
    return await this.userService.validateUniqueEmail(validateUniqueEmailDto);
  }

  @UseInterceptors(PaginationInterceptor)
  @Get("users")
  public async list(
    @Query() paginationRequestDto: PaginationRequestDto
  ): Promise<PaginationResponseDto> {
    return await this.userService.listUsers(paginationRequestDto);
  }

  @Delete("users/:userId")
  public async delete( @Param("userId", ParseIntPipe) userId: number,
  ){
    return await this.userService.deleteUser(userId);
  }
}
