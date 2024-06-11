import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public healthy() {
    return { message: `Hello World` };
  }
}
