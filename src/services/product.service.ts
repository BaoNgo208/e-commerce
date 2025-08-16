import prisma from '~/utils/prisma/prisma';
import { ProductNotFoundException } from '~/exceptions/ProductNotFoundException';
import { CreateProductRequest } from '~/dtos/requests/product.dto';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '~/exceptions/BadRequestException';
import { ProductSectionService } from './product-section.service';
import { ProductAlreadyExistsInSectionException } from '~/exceptions/ProductAlreadyExistsInSectionException';
import { BaseService } from './base.service';
import { productLogger } from '~/configs/logger';

export class ProductService extends BaseService {
  private productSectionService = new ProductSectionService();

  constructor() {
    super(productLogger);
  }

  async getById(id: string) {
    const logger = this.getLogger('GET');
    const product = await prisma.products.findUnique({ where: { id } });
    if (!product) {
      return this.throwAndLog(new ProductNotFoundException(), logger);
    }
    return product;
  }

  async getAll() {
    return prisma.products.findMany();
  }

  async create(createProductRequest: CreateProductRequest) {
    const logger = this.getLogger('POST');
    const { productName, regularPrice, quantity, shortDescription, productDescription } = createProductRequest;

    const requiredFields = {
      productName,
      regularPrice,
      quantity,
      shortDescription,
      productDescription
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (value === undefined || value === null || value === '') {
        return this.throwAndLog(new BadRequestException(`Missing required field: ${field}`), logger);
      }
    }

    const productData = {
      id: uuidv4(),
      product_name: createProductRequest.productName,
      regular_price: createProductRequest.regularPrice,
      quantity: createProductRequest.quantity,
      short_description: createProductRequest.shortDescription,
      product_description: createProductRequest.productDescription,
      created_at: new Date()
    };

    const newProduct = await prisma.products.create({ data: productData });
    return newProduct.id;
  }

  async getAllNotInSection(sectionId: string) {
    console.log('sectionId:', sectionId);
    return await prisma.products.findMany({
      where: {
        product_section_products: {
          none: {
            section_id: sectionId
          }
        }
      }
    });
  }

  async addToSection(sectionId: string, productIds: string[]) {
    const logger = this.getLogger('POST');
    const section = await this.productSectionService.getById(sectionId);

    const existingProductIds = new Set(section.product_section_products.map((psp) => psp.products.id));

    const duplicateIds = productIds.filter((id) => existingProductIds.has(id));

    if (duplicateIds.length != 0) {
      return this.throwAndLog(new ProductAlreadyExistsInSectionException(duplicateIds), logger);
    }

    await prisma.product_section_products.createMany({
      data: productIds.map((productId) => ({
        section_id: sectionId,
        product_id: productId
      })),
      skipDuplicates: true
    });
  }

  async removeFromSection(sectionId: string, productIds: string[]) {
    await prisma.product_section_products.deleteMany({
      where: {
        section_id: sectionId,
        product_id: {
          in: productIds
        }
      }
    });
  }
}
