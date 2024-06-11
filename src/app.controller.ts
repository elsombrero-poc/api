import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Healthy')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public healthy() {
    return this.appService.healthy();
  }

}
