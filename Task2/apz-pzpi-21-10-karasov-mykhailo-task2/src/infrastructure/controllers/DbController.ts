import {Request, NextFunction, Response} from "express";
import ExportImportManager from "../database/exportImportManager";
import * as path from "path";
import fs from "fs";
import ApiError from "../../core/common/error/ApiError";


export default class DbController {

    public async exportDb(req: Request, res: Response, next: NextFunction) {
        try {
            const exportImportDb = new ExportImportManager();
            const fileName = await exportImportDb.exportData();
            if (fileName === undefined) {
                return next(ApiError.internalServerError(`Unknown error`));
            }
            const filePath = path.join(__dirname, '..', 'database',  'dbCopy', fileName);

            res.download(filePath, fileName, (err) => {
                if (err) {
                    console.error('Ошибка при отправке файла:', err);
                    return res.status(500).send('Ошибка при отправке файла');
                }

                fs.unlinkSync(filePath);
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async importDb(req: Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const file = req.files.db;

            if (!file) {
                return next(ApiError.badRequest(`There no file`));
            }


            const filePath = path.resolve(__dirname, '..', 'database', 'dbCopy');
            // @ts-ignore
            fs.writeFileSync(path.join(filePath, file.name), file.data, {flag: 'w'});
            const exportImportDb = new ExportImportManager();
            // @ts-ignore
            await exportImportDb.importData(path.resolve(filePath, file.name));
            res.status(200).json({ message: 'Files uploaded successfully.' });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }


}