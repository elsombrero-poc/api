import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MS_USERS',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: config.get('MS_USERS_PACKAGE'),
              protoPath: join(__dirname, '../../../protos/ms-user/users.proto'),
              url: config.get('MS_USERS_URL'),
            }
          }
        }
      }
    ])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UserModule {}
