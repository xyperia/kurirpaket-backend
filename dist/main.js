"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    var apm = require('elastic-apm-node').start({
        serviceName: 'KurirPaket',
        secretToken: '',
        serverUrl: 'http://10.30.100.16:8200',
        environment: 'Development'
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map