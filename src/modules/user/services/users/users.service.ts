import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UsersGRPCService } from '../../dto/interface/user';
import { FindUsers } from '../../../../common/grpc/msusers/FindUsers';
import { SearchCriteria } from '../../../../common/grpc/SearchCriteria';
import { UserLogin } from '../../../../common/grpc/msusers/UserLogin';
import { UserToken } from '../../../../common/grpc/msusers/UserToken';
import { CreateUser } from '../../../../common/grpc/msusers/CreateUser';
import { User } from '../../../../common/grpc/msusers/User';

@Injectable()
export class UsersService {
  private user: UsersGRPCService;

  constructor(@Inject('MS_USERS') private client: ClientGrpc) {
    this.user = this.client.getService<UsersGRPCService>('UsersService');
  }

  public async create(user: CreateUser): Promise<User> {
    return await firstValueFrom(this.user.Create(user))
  }

  public async find(criteria: SearchCriteria): Promise<FindUsers> {
    return await firstValueFrom(this.user.Find(criteria));
  }

  public async login(credential: UserLogin): Promise<UserToken> {
    return await firstValueFrom(this.user.Login(credential))
  }

  public parseQuerySearch(q?: string): {[key: string]: string} {
    if(!q) return {}
    const queries = q.split(',')
    return queries.reduce((value, query) => {
      const node = query.split('=')
      return {[node[0]]: node[1], ...value}
    }, {})
  }
}
