/**
 * @api {get} /api/users Get all users
 * @apiGroup User
 * @apiName GetUsers
 * @apiDescription Get all users
 * @apiVersion 1.0.0
 * @apiSampleRequest http://localhost:5000/api/users
 * @apiSuccessExample {json} Success-Response:
 */

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/routes.js';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
