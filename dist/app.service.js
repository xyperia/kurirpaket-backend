"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getHello() {
        return "Hello World";
    }
    sendPacketUsingUDP(data) {
        let jsonres = [];
        if (data.NUM_OF_REQUESTS > 50) {
            jsonres = [{
                    "code": "403",
                    "message": "NUM_OF_REQUEST is limited to 50 requests. Ask the administrator to increase the limit.",
                    "data": ""
                }];
            return jsonres;
        }
        else {
            var dgram = require('dgram');
            var client = dgram.createSocket('udp4');
            let res, jsonres_child = [], apd_data = [];
            let buffer_data = Buffer.from(data.PACKET_BODY);
            let buffersize = buffer_data.length;
            for (let i = 1; i <= data.NUM_OF_REQUESTS; i++) {
                apd_data = data.PACKET_BODY[Math.floor(Math.random() * buffersize)];
                client.send(apd_data, data.DESTINATION_PORT, data.DESTINATION_IP);
                jsonres_child.push({
                    "code": "200",
                    "message": `Packets sent using UDP to ${data.DESTINATION_IP}:${data.DESTINATION_PORT}`,
                    "data": apd_data
                });
            }
            jsonres = [{
                    "code": "200",
                    "total": jsonres_child.length,
                    "data": jsonres_child
                }];
            return jsonres;
        }
        return "Success";
    }
    sendPacketUsingTCP(data) {
        var net = require('net');
        var res;
        let client = new net.Socket();
        client.connect(data.DESTINATION_PORT, data.DESTINATION_IP, () => {
            client.write(Buffer.from(data.PACKET_BODY), (err) => {
                res = `Packets sent using TCP to ${data.DESTINATION_IP}:${data.DESTINATION_PORT}`;
                if (err) {
                    res = err;
                }
                console.log(res);
                client.end();
            });
        });
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map