import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from '../model/user/user.schema';
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async login(email: string) {
        const payload = { email: email}

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}