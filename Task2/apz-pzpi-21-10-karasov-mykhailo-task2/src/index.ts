import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { port } from './config';
import sequelize from './infrastructure/database/database';
import router from './infrastructure/routes/index';
import errorHandler from "./core/common/middlewares/ErrorHandlingMiddleware";
import fileUpload from 'express-fileupload'

dotenv.config();

const app = express();

const PORT = port;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use('/api', router);


// LAST MIDDLEWARE
app.use(errorHandler);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`[server]: Server started work on http://localhost:${PORT}`);
    });
})