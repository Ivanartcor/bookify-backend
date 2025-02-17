import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {

  // Crear la aplicación usando el tipo NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  

   // Configurar la carpeta "uploads" como carpeta estática
   app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',  // Esto hará que los archivos sean accesibles vía http://localhost:3000/uploads/archivo.jpg
  });

  // Escuchar en el puerto definido en process.env.PORT o por defecto en 3000
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
