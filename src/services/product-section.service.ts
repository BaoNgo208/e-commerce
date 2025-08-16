import prisma from '~/utils/prisma/prisma';
import { ProductSectionNotFoundException } from '~/exceptions/ProductSectionNotFoundException';
import { productSectionLogger } from '~/configs/logger';
import { BaseService } from './base.service';

export class ProductSectionService extends BaseService {
  constructor() {
    super(productSectionLogger);
  }

  async getById(id: string) {
    const logger = this.getLogger('GET');
    const section = await prisma.product_sections.findUnique({
      where: { id },
      include: { product_section_products: { include: { products: true } } }
    });
    if (!section) {
      return this.throwAndLog(new ProductSectionNotFoundException(), logger);
    }
    return section;
  }

  async getAll() {
    return await prisma.product_sections.findMany({
      orderBy: {
        display_order: 'asc'
      },
      include: {
        product_section_products: {
          include: {
            products: true
          }
        }
      }
    });
  }

  async getAllActive() {
    const logger = this.getLogger('GET');
    const profiler = productSectionLogger.startTimer();
    const sections = await prisma.product_sections.findMany({
      where: { is_active: true },
      orderBy: { display_order: 'asc' },
      include: {
        product_section_products: {
          include: { products: true }
        }
      }
    });

    // const formatted = sections.map((section) => ({
    //   ...section,
    //   products: section.product_section_products.map((psp) => psp.products)
    // }));
    profiler.done({ message: `Done request`, endpoint: '/get-all-active' });
    // logger.error('An error log:', new ProductSectionNotFoundException('504 Bad Gateway'));
    return sections;
  }

  async getReOrderedProductSection(newOrderMap: Record<string, number>) {
    const titles = Object.keys(newOrderMap);

    const sections = await prisma.product_sections.findMany({
      where: {
        title: {
          in: titles
        }
      },
      include: {
        product_section_products: {
          include: {
            products: true
          }
        }
      }
    });

    const updatedSections = await Promise.all(
      sections.map((section: any) => {
        const newOrder = newOrderMap[section.title];
        if (newOrder !== undefined) {
          return prisma.product_sections.update({
            where: { id: section.id },
            data: { display_order: newOrder },
            include: {
              product_section_products: {
                include: {
                  products: true
                }
              }
            }
          });
        }
        return Promise.resolve(section);
      })
    );

    return updatedSections.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  }
}
