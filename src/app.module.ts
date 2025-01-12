import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CryptoGateway } from './crypto.gateway';
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'static'), // Adjust the path if necessary
        }),
    ],
    providers: [CryptoGateway],
})

export class AppModule {}