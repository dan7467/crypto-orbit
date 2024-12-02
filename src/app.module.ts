import { Module } from '@nestjs/common';
import { CryptoGateway } from './crypto.gateway';

@Module({
    providers: [CryptoGateway],
})

export class AppModule {}