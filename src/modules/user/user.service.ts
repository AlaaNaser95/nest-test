import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/request/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./dto/response/user.dto";
import { UserRepository } from "../../database/repositories/user.repository";
import * as bcrypt from "bcrypt";
import { User } from "../../database/entities/user.entity";
import { Brackets, Not } from "typeorm";
import { PaginationResponseDto } from "../../common/dtos/response/pagination-response.dto";
import { UpdateUserDto } from "./dto/request/update-user.dto";
import { ValidateUniqueEmailDto } from "./dto/request/validate-unique-email.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(req, createUserDto: CreateUserDto) {
    await this.validateUniqueEmail(
        new ValidateUniqueEmailDto(createUserDto.email)
    );
    createUserDto.password = await this.hashPassword(createUserDto.password);

    const user = await this.userRepository.create({
      ...createUserDto,
    });
    const userModel = await this.userRepository.save(user);

    return {data:new UserDto(userModel), message:"User has been created successfully"};
  }

  async updateUser(userId, updateUserDto: UpdateUserDto) {
    const user = await this.getUser({ id: userId });
    await this.validateUniqueEmail(
        new ValidateUniqueEmailDto(updateUserDto.email, user?.id)
    );
    if (updateUserDto.password)
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    await this.userRepository.update(userId, updateUserDto);
    return {data: new UserDto(await  this.userRepository.findOne(userId)), message:"User has been updated successfully"};
  }

  async validateUniqueEmail(
    validateUniqueEmailDto: ValidateUniqueEmailDto,
    throwException = true
  ) {
    let queryConditions = {
      email: validateUniqueEmailDto.email,
    };
    if (validateUniqueEmailDto.userId) {
      queryConditions = Object.assign(queryConditions, {
        id: Not(validateUniqueEmailDto.userId),
      });
    }
    if (
      await this.userRepository.count({
        where: queryConditions,
      })
    ) {
      const message = `Email: ${validateUniqueEmailDto.email} already exists`;
      if (throwException) throw new BadRequestException(message);

      return {
        valid: false,
        message: message,
      };
    }
    return {
      valid: true,
      message: `Email: ${validateUniqueEmailDto.email} is valid`,
    };
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, process.env.PASS_HASH_SALT);
  }

  async viewUser(userId) {
    const user = await this.getUser({ id: userId },true);
    return new UserDto(user);
  }

  async getUser(
    conditions: Object | Array<object>,
    throwError?: boolean
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: conditions,
    });
    if (!user && throwError) throw new NotFoundException("User is not found");

    return user;
  }

  async listUsers( paginationRequestDto): Promise<PaginationResponseDto> {
    const { page, limit, sort, search } = paginationRequestDto;
    let query = await this.userRepository
      .createQueryBuilder("user");
    if (search) {
      await query.andWhere(
        new Brackets((qb) => {
          qb.where("CONCAT(user.firstname,' ',user.lastname) like :firstname", {
            firstname: `%${search}%`,
          })
            .orWhere("user.email like :email", { email: `%${search}%` })
        })
      );
    }

    const [users, count] = await query
      .take(limit)
      .skip(limit * (page - 1))
      .orderBy("user.id", sort)
      .getManyAndCount();
    return new PaginationResponseDto(
      users.map((user) => {
        return new UserDto(user);
      }),
      count
    );
  }

  async deleteUser(userId){
     await this.userRepository.softDelete(userId);
     return {message: "User has been deleted successfully"}
  }
}
