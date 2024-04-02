import ScannerService from "../../core/services/ScannerService/ScannerService";
import {NextFunction, Request, Response} from "express";
import CreateOrUpdateScannerDto from "../../core/repositories/ScannerRepository/dto/CreateOrUpdateScannerDto";
import ScannerMapper from "../mappers/ScannerMapper/ScannerMapper";
import ApiError from "../../core/common/error/ApiError";

export default class ScannerController {
    constructor(
       private readonly scannerService: ScannerService,
       private readonly scannerMapper: ScannerMapper
    ) {}

    public async createScanner(req: Request, res: Response, next: NextFunction) {
        try {
            const { description, userId } = req.body;
            const dto: CreateOrUpdateScannerDto = new CreateOrUpdateScannerDto(description, Number(userId) || null, req.user.companyId);

            const scannerDomainModel = await this.scannerService.createScanner(dto);
            const scanner = this.scannerMapper.toPersistenceModel(scannerDomainModel);
            return res.status(201).json({ scanner: scanner});
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    public async getCompanyScanners(req: Request, res: Response, next: NextFunction) {
        try {
           if (req.user.companyId) {
               const scannersDomain = await this.scannerService.getCompanyScanners(req.user.companyId);
               const scanners = scannersDomain.map(scanner => {
                   return this.scannerMapper.toPersistenceModel(scanner);
               })
               return res.status(200).json({ scanners: scanners });
           } else {
               return next(ApiError.badRequest(`There no company id`));
           }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async getScannerById(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.user.companyId) {
                const { id } = req.params;
                const scanner = await this.scannerService.getScanner(Number(id), req.user.companyId);
                return res.status(200).json({ scanner: scanner });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    public async updateScanner(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { description, userId } = req.body;
            const dto: CreateOrUpdateScannerDto = new CreateOrUpdateScannerDto(description, userId, req.user.companyId);
            const updatedScannerDomain = await this.scannerService.updateScanner(dto, Number(id));
            const scanner = this.scannerMapper.toPersistenceModel(updatedScannerDomain);
            return res.status(200).json({ scanner: scanner });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async deleteScanner(req: Request, res: Response, next: NextFunction) {
        try {
           if (req.user.companyId) {
               const { id } = req.params;
               await this.scannerService.deleteScanner(Number(id), req.user.companyId);
               return res.status(200).json({})
           }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

