import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Request, Response } from "express";

async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors();

    app.useStaticAssets(join(__dirname, '..', 'static'));

    app.getHttpAdapter().get('/', (req: Request, res: Response) => {
        res.sendFile(join(__dirname, '..', 'src', 'static', 'index.html'));
    });

    await app.listen(3000);

    console.log('\n# Server started\n');
}

bootstrap();