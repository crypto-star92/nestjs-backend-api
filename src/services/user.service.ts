import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../model/user/user.schema'
import { Model } from 'mongoose'
import { CreateUserInput, LoginUserInput, UpdateUserInput } from '../model/user/user.input'
import { UserPayload } from '../model/user/user.payload'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async validateUser(body: LoginUserInput): Promise<UserPayload> {
        const user = await this.userModel.findOne({ email: body.email }).exec()

        if (!user || user.password != body.password) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        return user
    }

    async createUser(body: CreateUserInput): Promise<UserPayload> {
        const existingUser = await this.userModel.findOne({ email: body.email }).exec()
        if (existingUser) {
            throw new ConflictException('User already exists')
        }

        const createdUser = new this.userModel(body)
        const user = await createdUser.save()
        return user
    }

    async findUser(id: string): Promise<UserPayload> {
        const user = await this.userModel.findOne({ _id: id }).exec()

        if (!user) {
            throw new NotFoundException(`User with email id:${id} not found `)
        }
        return user
    }

    async listUser(): Promise<UserPayload[]> {
        const users = await this.userModel.find()
        return users
    }

    async updateUser(id: string, body: UpdateUserInput): Promise<UserPayload> {
        await this.userModel.updateOne({ _id: id }, body)
        const updatedUser = this.userModel.findById(id)
        return updatedUser
    }

    async deleteUser(id: string): Promise<void> {
        await this.userModel.deleteOne({ _id: id })
    }
}