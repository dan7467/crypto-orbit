import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Request, Response } from "express";

async function bootstrap() {


    // TO-DO: switch the front to React !! html alone is the worst.

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const port = 3000;

    app.enableCors();

    app.useStaticAssets(join(__dirname, '..', 'src', 'static'));

    app.getHttpAdapter().get('/', (req: Request, res: Response) => {
        res.sendFile(join(__dirname, '..', 'static', 'index.html'));
    });
    
    app.getHttpAdapter().get('/prices', (req: Request, res: Response) => {
        res.sendFile(join(__dirname, '..', 'src', 'static', 'prices.html'));
    });
    
    app.getHttpAdapter().get('/btc', (req: Request, res: Response) => {
        res.sendFile(join(__dirname, '..', 'src', 'static', 'btc.html'));
    });
    
    app.getHttpAdapter().get('/ethereum', (req: Request, res: Response) => {
        res.sendFile(join(__dirname, '..', 'src', 'static', 'ethereum.html'));
    });
    
    app.getHttpAdapter().get('/live_plot', (req: Request, res: Response) => {
        res.sendFile(join(__dirname, '..', 'src', 'static', 'coin_plotter.html'));
    });

    await app.listen(port);

    console.log('\n# Server started on port',port,': http://localhost:'+port+'\n');
}

bootstrap();