import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';
import { WebSocket } from 'ws';

@WebSocketGateway({ cors: true })
export class CryptoGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private readonly logger: Logger = new Logger(CryptoGateway.name);
    private readonly coinCapSocketUrl: string = 'wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin,solana,tether,cardano';
    private coinCapSocket: WebSocket;
    
    afterInit() {
        this.logger.log('WebSocket Gateway Initialized');
        this.startCoinCapSocket();
    }

    handleConnection(client: any) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: any) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    private startCoinCapSocket(){
        this.coinCapSocket = new WebSocket(this.coinCapSocketUrl);

        this.coinCapSocket.on('message', (data: string) => {
            const prices: any = JSON.parse(data);
            this.server.emit('prices', prices);
        });

        this.coinCapSocket.on('error ', (error) => {
            this.logger.error('CoinCap WebSocket Error: ' , error);
        });

        this.coinCapSocket.on('close', () => {
            this.logger.warn('CoinCap WebSocket closed, reconnecting...');
            setTimeout(() => this.startCoinCapSocket(), 1000);  // reconnect after 1 second
        });
    }
}