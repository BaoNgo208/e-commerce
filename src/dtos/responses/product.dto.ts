import { Expose, Transform, Type } from 'class-transformer';

import { DecimalNumber } from '~/utils/DecimalNumber';

export class ProductResponse {
  @Expose()
  id!: string;

  @Expose({ name: 'product_name' })
  productName?: string;

  @Expose({ name: 'regular_price' })
  @Type(() => DecimalNumber)
  regularPrice?: DecimalNumber;

  @Expose({ name: 'discount_price' })
  @Type(() => DecimalNumber)
  discountPrice?: number;

  @Expose()
  quantity?: number;

  @Expose({ name: 'short_description' })
  shortDescription?: string;

  @Expose({ name: 'product_description' })
  productDescription?: string;
}
