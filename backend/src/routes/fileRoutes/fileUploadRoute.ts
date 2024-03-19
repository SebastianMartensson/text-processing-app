import { Router } from 'express';
import multer from 'multer';
import * as fileController from '../../controller/fileController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), fileController.fileHandler);

export default router;