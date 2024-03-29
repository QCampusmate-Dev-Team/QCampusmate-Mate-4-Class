import { Controller, Get, Post, Patch, Delete, Param, Body, Query, Session, UseInterceptors, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service'
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorators';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity'
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor) // makes one DB access
export class UsersController {
  // declare UsersController's dependencies
  constructor(
    private usersService: UsersService,
    private authService: AuthService
    ) {
  }

  /**
   * TODO: 
   *  add Admin permission to this handler(currently this method is public to all)
   * 
   * This method should return only one user, but currently the return value from UsersService#find is Promise<User[]>
   * 
   * @param email 
   * @returns 
   */
  @Get()
  findAllUsersHasEmail(@Query('email') email: string){
    // find all users with a given email
    return this.usersService.find(email)
  }

  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findOne(parseInt(session.userId))
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() currentUser: User) {
    return currentUser
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any){
    const user = await this.authService.register(body.email, body.password)
    session.userId = user.id
    return user
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.authenticateUser(body.email, body.password)

    session.userId = user.id
    return user 
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await (this.usersService.findOne(parseInt(id)));
    if (!user) {
      throw new NotFoundException(`User with id '${id}' is not found`);
    }
    
    return user;
  }

  @Patch('/:id')
  updateUser(@Param('id') id:string, @Body() body: UpdateUserDto){
    return this.usersService.update(parseInt(id), body)
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id))
  }
}
