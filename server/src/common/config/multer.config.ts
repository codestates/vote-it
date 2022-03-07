import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { mkdirSync } from 'fs';
import * as multer from 'multer';
import * as path from 'path';

const storage = (directoryname: string) => {
  const directoryPath = path.join(__dirname, '..', 'uploads', directoryname);
  mkdirSync(directoryPath, { recursive: true });

  return multer.diskStorage({
    destination(req, file, cb) {
      cb(null, directoryPath);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;
      cb(null, fileName);
    },
  });
};

const multerConfig = (directoryName: string): MulterOptions => ({
  storage: storage(directoryName),
  limits: { fileSize: 1_048_576 * 4 /* 4MB */ },
  fileFilter(req, file, cb) {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/webp' ||
      file.mimetype === 'image/svg+xml'
    ) {
      cb(null, true);
      return;
    }
    cb(
      new BadRequestException(`지원하지 않는 ${file.mimetype} 형식입니다.`),
      false,
    );
  },
});

export default multerConfig;
