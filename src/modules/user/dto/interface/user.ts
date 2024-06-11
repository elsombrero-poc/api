import { Observable } from 'rxjs';
import { UserToken } from '../../../../common/grpc/msusers/UserToken';
import { MessageResponse } from "../../../../common/grpc/MessageResponse";
import { User } from '../../../../common/grpc/msusers/User';
import { FindUsers } from '../../../../common/grpc/msusers/FindUsers';
import { SearchCriteria } from '../../../../common/grpc/SearchCriteria';
import { CreateUser } from '../../../../common/grpc/msusers/CreateUser';
import { UserLogin } from '../../../../common/grpc/msusers/UserLogin';
import { UpdateUser } from '../../../../common/grpc/msusers/UpdateUser';
import { IdUser } from '../../../../common/grpc/msusers/IdUser';
import { UpdatePassword } from '../../../../common/grpc/msusers/UpdatePassword';

export interface UsersGRPCService {
  Find (criteria: SearchCriteria): Observable<FindUsers>;
  Create (user: CreateUser): Observable<User>;
  Login (credentials: UserLogin): Observable<UserToken>;
  Update(user: UpdateUser): Observable<MessageResponse>;
  Remove(user: IdUser): Observable<MessageResponse>;
  UpdatePassword(pwd: UpdatePassword): Observable<MessageResponse>;
}