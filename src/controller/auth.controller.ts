import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginUserInput } from "src/model/user/user.input";
import { AuthService } from "src/services/auth.service";
import { UserService } from "src/services/user.service";

@ApiTags('Authentication')
@Controller()

export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    @Post('login')
    async login(@Body() body: LoginUserInput) {
        const user = await this.userService.validateUser(body)

        return this.authService.login(user.email)
    }
}