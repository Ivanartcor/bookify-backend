import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Carpeta donde se guardarán los archivos
        filename: (req, file, callback) => {
          // Generar un nombre único para evitar conflictos
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${fileExtName}`);
        },
      }),
      // Aquí puedes agregar filtros (por ejemplo, limitar tamaño o tipos de archivo)
    }),
  )
  async uploadFile(@UploadedFile() file: any) {
    // Retornamos la ruta para que el frontend pueda usarla y guardarla en la entidad correspondiente
    return {
      message: 'File uploaded successfully',
      filePath: `http://Localhost:3000/uploads/${file.filename}`,
    };
  }
}
