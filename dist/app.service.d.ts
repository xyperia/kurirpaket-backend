export declare class AppService {
    getHello(): string;
    sendPacketUsingUDP(data: any): any[] | "Success";
    sendPacketUsingTCP(data: any): void;
}
