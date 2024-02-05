import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  /*
  var apm = require('elastic-apm-node').start({
    serviceName: 'KurirPaket',
    serverUrl: 'http://10.30.100.16:8200',
    environment: 'Development'
  })
  */

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
