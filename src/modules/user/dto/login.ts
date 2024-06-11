import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({required: true})
  'email': (string);
  @ApiProperty({required: true})
  'password': (string);
}

export class UserTokenDto {
  @ApiProperty({required: true})
  'token': (string);
}