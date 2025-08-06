import { Request, Response, NextFunction } from 'express';
import { ProductService } from '~/services/product.service';
import { plainToInstance } from 'class-transformer';
import { ProductResponse } from '~/dtos/responses/product.dto';

export class ProductController {
  private productService = new ProductService();

  public getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getAll();
      res.json(products);
    } catch (err) {
      next(err);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const product = await this.productService.getById(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createProductRequest = req.body;
      const id = await this.productService.create(createProductRequest);
      res.status(201).send(`created product with id: ${id}`);
    } catch (err) {
      next(err);
    }
  };

  public getAllProductNotInSection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getAllNotInSection(req.params.id);
      const transformedProducts = products.map((product) =>
        plainToInstance(ProductResponse, product, { excludeExtraneousValues: true })
      );

      console.log(transformedProducts);
      res.json(transformedProducts);
    } catch (err) {
      next(err);
    }
  };

  public addProductsToSection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sectionId, productIds } = req.body;
      await this.productService.addToSection(sectionId, productIds);
      res.status(200).json({ message: 'Products added successfully' });
    } catch (err) {
      next(err);
    }
  };

  public removeProductsFromSection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sectionId, productIds } = req.body;
      await this.productService.removeFromSection(sectionId, productIds);
      res.status(200).json({ message: 'Products removed successfully' });
    } catch (err) {
      next(err);
    }
  };
}

export default new ProductController();
