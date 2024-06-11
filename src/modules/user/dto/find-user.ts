import { ApiProperty } from "@nestjs/swagger";

export class Profile {
  @ApiProperty({required: false})
  'name'?: (string);
  @ApiProperty({required: false})
  'lastname'?: (string);
}

export class User {
  @ApiProperty({required: false})
  '_id'?: (string);
  @ApiProperty({required: false})
  'email'?: (string);
  @ApiProperty({required: false})
  'profile'?: Profile;
}

export class FindUserDto {
  @ApiProperty({isArray: true})
  users: User;
}