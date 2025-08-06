import { Expose, Type } from 'class-transformer';
import { ProductResponse } from './product.dto';
import { ProductSectionProduct } from './product-section-product.dto';

export class GetActiveProductSectionResponse {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose({ name: 'display_order' })
  displayOrder!: number;

  @Expose()
  description?: string;

  @Expose({ name: 'is_active' })
  isActive?: boolean;

  @Type(() => ProductSectionProduct)
  @Expose()
  product_section_products!: ProductSectionProduct[];

  @Expose()
  get products(): ProductResponse[] {
    return this.product_section_products?.map((psp) => psp.products) ?? [];
  }
}
