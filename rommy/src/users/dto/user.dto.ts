import { ApiProperty } from "@nestjs/swagger";

export class UserDto{
    @ApiProperty({example: "user@mail.ru", description: "Почта (логин)"})
    readonly email: string;

    @ApiProperty({example: "12345qwert", description: "Пароль"})
    readonly password: string;


 


   
}