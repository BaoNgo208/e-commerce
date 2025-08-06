import { ProductResponse } from './product.dto';
import { Expose, Type } from 'class-transformer';

export class ProductSectionProduct {
  @Expose()
  @Type(() => ProductResponse)
  products!: ProductResponse;
}
