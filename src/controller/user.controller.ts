import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateUserInput } from '../model/user/user.input'
import { UserService } from '../services/user.service'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('User')
@Controller({
    path: 'users',
    version: '1',
})
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiBody({
       type: CreateUserInput,
       description: 'Json structure for user object',
    })
    createUser(@Body() body: CreateUserInput) {
        return this.userService.createUser(body)
    }

    @Get('/list')
    listUser() {
        return this.userService.listUser()
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findUser(id)
    }

    @Put('/:id')
    updateUser(@Param('id') id: string, @Body() body: CreateUserInput) {
        return this.userService.updateUser(id, body)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }
}