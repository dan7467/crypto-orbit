import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';
import { WebSocket } from 'ws';

    // TO-DO 1.1: store an array of last 10 values for each coin
    // TO-DO 1.2: generify the array, to be able to include x values
    // TO-DO 1.3: add a button to dynamically control the array length button
    // TO-DO 1.4: add a graph to be controlled by that button

    // TO-DO 2: generify the coins

    //

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