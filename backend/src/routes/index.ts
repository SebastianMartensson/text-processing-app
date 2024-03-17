import express from "express";
import fileRoutes from './fileRoutes/fileUploadRoute';

const router = express.Router();

router.use('/upload', fileRoutes);

export default router;