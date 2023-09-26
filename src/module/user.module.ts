import { Module } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { UserController } from '../controller/user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../model/user/user.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule { }