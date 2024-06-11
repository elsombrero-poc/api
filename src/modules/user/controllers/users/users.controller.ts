import { Body, Controller, DefaultValuePipe, Get, HttpException, HttpStatus, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindUserDto, User } from '../../dto/find-user';
import { FindUsers } from '../../../../common/grpc/msusers/FindUsers';
import { LoginDto, UserTokenDto } from '../../dto/login';
import { UserToken } from '../../../../common/grpc/msusers/UserToken';
import { CreateUserDto } from '../../dto/create-user';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private user: UsersService) {}

  @Post()
  @ApiResponse({type: FindUserDto})
  public async create(@Body() user: CreateUserDto): Promise<User> {
    try { return await this.user.create(user) }
    catch(e) { throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR) }
  }

  @Get()
  @ApiQuery({name: 'count', required: false})
  @ApiQuery({name: 'page', required: false})
  @ApiQuery({name: 'fields', required: false})
  @ApiQuery({name: 'q', required: false})
  @ApiResponse({type: FindUserDto})
  public async find(
    @Query('count', new DefaultValuePipe(0), ParseIntPipe) count: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('fields') fields?: string,
    @Query('q') q?: string,
  ): Promise<FindUsers> {
    try{
      return await this.user.find({
        count, page,
        fields: fields?.split(','),
        q: this.user.parseQuerySearch(q),
      }) 
    }
    catch(e) { throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR) }
  }

  @Post('login')
  @ApiResponse({type: UserTokenDto})
  public async login(@Body() credential: LoginDto): Promise<UserToken> {
    try { return await this.user.login(credential) }
    catch(e) { throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR) }
  }
}
