import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World";
  }

  sendPacketUsingUDP(data){
    // console.log(data);
    let jsonres = [];
    if(data.NUM_OF_REQUESTS > 50){
      jsonres = [{
        "code": "403",
        "message": "NUM_OF_REQUEST is limited to 50 requests. Ask the administrator to increase the limit.",
        "data": ""
      }];

      return jsonres;
    } else {
      var dgram = require('dgram');
      var client = dgram.createSocket('udp4');
      let res, jsonres_child = [], apd_data = [];

      let buffer_data = Buffer.from(data.PACKET_BODY);
      let buffersize = buffer_data.length;

      for(let i=1;i<=data.NUM_OF_REQUESTS;i++){
        apd_data = data.PACKET_BODY[Math.floor(Math.random() * buffersize)];
        client.send(apd_data, data.DESTINATION_PORT, data.DESTINATION_IP);
        jsonres_child.push({
          "code": "200",
          "message": `Packets sent using UDP to ${data.DESTINATION_IP}:${data.DESTINATION_PORT}`,
          "data": apd_data
        });
      }

      // let lastdata = data.PACKET_BODY[Math.floor(Math.random() * buffersize)];
      // client.send(lastdata, data.DESTINATION_PORT, data.DESTINATION_IP, (err) => {
      //   res = `Packets sent using UDP to ${data.DESTINATION_IP}:${data.DESTINATION_PORT}`;
      //   if(err){
      //     res = err;
      //   }
      //   console.log(res);
      //   jsonres_child.push({
      //     "code": "200",
      //     "message": `Packets sent using UDP to ${data.DESTINATION_IP}:${data.DESTINATION_PORT}`,
      //     "data": lastdata
      //   });
      //   client.close();
      // });

      jsonres = [{
        "code": "200",
        "total": jsonres_child.length,
        "data": jsonres_child
      }];

      return jsonres;
    }
    


    return "Success";
  }

  sendPacketUsingTCP(data){
    var net = require('net');
    var res;

    let client = new net.Socket();
    client.connect(data.DESTINATION_PORT, data.DESTINATION_IP, () => {
      
      client.write(Buffer.from(data.PACKET_BODY), (err) => {
        res = `Packets sent using TCP to ${data.DESTINATION_IP}:${data.DESTINATION_PORT}`;
        if(err){
          res = err;
        }
        console.log(res);
        client.end();
      });
      
    });

  }
}