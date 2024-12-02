import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Request, Response } from "express";
import { NestFactoryStatic } from '@nestjs/core/nest-factory';

async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors();

    app.useStaticAssets(join(__dirname, '..', 'src', 'static'));

    app.getHttpAdapter().get('/', (req: Request, res: Response) => {
        res.sendFile(join(__dirname, '..', 'src', 'static', 'index.html'));
    });

    await app.listen(3000);

    console.log('\n# Server started\n');
}

bootstrap();