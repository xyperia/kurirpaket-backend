import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('')
  sendPacket(@Body() data: any) {
    // console.log(data);
    return this.appService.sendPacketUsingUDP(data);
    if(data.PROTOCOL == 'UDP'){
      return this.appService.sendPacketUsingUDP(data);
    } else if(data.PROTOCOL == 'TCP'){
      return this.appService.sendPacketUsingTCP(data);
    }
  }
}
