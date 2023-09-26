import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserInput {
    @ApiProperty({
        example: 'John Doe',
        required: true
    })    
    @IsString()
    fullName: string

    @ApiProperty({
        example: 'johndoe@example.com',
        required: true
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: 'johndoe@example.com',
    })
    @IsEmail()
    bio: string
    
    @ApiProperty({
        example: '12345678',
        required: true
    })
    @IsNotEmpty()
    @MinLength(8)
    password: string
    
}

export class UpdateUserInput extends OmitType(CreateUserInput, [
    'password'
] as const) { }