import {ApiProperty} from "@nestjs/swagger";

export class userData {
    @ApiProperty({example: "mymail@gmail.com", description: "user's mail"})
    readonly email: string
    @ApiProperty({example: "1234pass777", description: "user's password"})
    readonly password: string
}

export class roleData {
    readonly userId: number
    readonly role: string
}

export class banData {
    readonly userId: number
    readonly reason: string
}