import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import ApiError from "../error/ApiError";
import * as buffer from "buffer";

class FileManager {
    async createFile(file: any): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', '..', '..', '..', '.dist', 'static');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            console.log(file)
            fs.writeFileSync(path.join(filePath, fileName), file.data);
            return fileName;
        } catch (error) {
            console.log(error);
            throw ApiError.internalServerError('Error while creating file');
        }
    }
}

export default FileManager;