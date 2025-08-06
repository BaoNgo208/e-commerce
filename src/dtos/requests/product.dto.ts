import { Expose, Type } from 'class-transformer';
import { DecimalNumber } from '~/utils/DecimalNumber';

export class CreateProductRequest {
  @Expose({ name: 'product_name' })
  productName!: string;

  @Expose({ name: 'regular_price' })
  @Type(() => DecimalNumber)
  regularPrice!: DecimalNumber;

  @Expose()
  quantity!: number;

  @Expose({ name: 'short_description' })
  shortDescription?: string;

  @Expose({ name: 'product_description' })
  productDescription?: string;
}
