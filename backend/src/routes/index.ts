import express from "express";
import fileRoutes from './fileRoutes/fileUploadRoute';

const router = express.Router();

router.use('/file', fileRoutes);

export default router;