import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { port } from './config';
import sequelize from './infrastructure/database/database';

dotenv.config();

const app = express();

const PORT = port;

app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`[server]: Server started work on http://localhost:${PORT}`);
    });
})