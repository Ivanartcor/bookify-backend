import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // Crear la aplicación usando el tipo NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ Habilitar CORS para permitir solicitudes desde Angular
  app.enableCors({
    origin: 'http://localhost:4200', // Permitir solicitudes desde el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permitir cookies y cabeceras de autenticación
  });

  // Configurar la carpeta "uploads" como carpeta estática
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',  // Accesible en http://localhost:3000/uploads/archivo.jpg
  });

  // Escuchar en el puerto definido en process.env.PORT o por defecto en 3000
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

