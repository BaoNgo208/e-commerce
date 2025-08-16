import { Expose, Transform, Type } from 'class-transformer';

import { DecimalNumber } from '~/utils/DecimalNumber';

export class ProductResponse {
  @Expose()
  id!: string;

  @Expose({ name: 'product_name' })
  product_name?: string;

  @Expose({ name: 'regular_price' })
  @Type(() => DecimalNumber)
  regular_price?: DecimalNumber;

  @Expose({ name: 'discount_price' })
  @Type(() => DecimalNumber)
  discount_price?: number;

  @Expose()
  quantity?: number;

  @Expose({ name: 'short_description' })
  short_description?: string;

  @Expose({ name: 'product_description' })
  product_description?: string;
}
