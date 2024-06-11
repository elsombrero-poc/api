import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "./find-user";

export class CreateUserDto {
  @ApiProperty({required: true})
  'email'?: (string);
  @ApiProperty({required: true})
  'password'?: (string);
  @ApiProperty({required: true})
  'profile'?: Profile;
}