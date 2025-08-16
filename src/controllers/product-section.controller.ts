import { Request, Response, NextFunction } from 'express';
import { ProductSectionService } from '~/services/product-section.service';
import { plainToInstance } from 'class-transformer';
import { ProductResponse } from '~/dtos/responses/product.dto';

export class ProductSectionController {
  private productSectionService = new ProductSectionService();

  getProductSectionById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const productSection = await this.productSectionService.getById(id);
      res.json(productSection);
    } catch (error) {
      next(error);
    }
  };

  getAllProductSections = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sections = await this.productSectionService.getAll();
      res.json(sections);
    } catch (error) {
      next(error);
    }
  };

  getAllActiveProductSection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sections = await this.productSectionService.getAllActive();

      res.json(sections);
    } catch (error) {
      next(error);
    }
  };

  getReOrderedProductSection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newOrderMap: Record<string, number> = req.body;
      const reorderedSections = await this.productSectionService.getReOrderedProductSection(newOrderMap);
      res.json(reorderedSections);
    } catch (error) {
      next(error);
    }
  };
}

export default new ProductSectionController();
