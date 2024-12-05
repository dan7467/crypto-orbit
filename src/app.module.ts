import { Module } from '@nestjs/common';
import { CryptoGateway, BTCGateway } from './crypto.gateway';

@Module({
    providers: [CryptoGateway, BTCGateway],
})

export class AppModule {}