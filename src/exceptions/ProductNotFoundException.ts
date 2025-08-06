import { BaseError } from './BaseException';
import { ErrorCodes } from './ErrorCode';

export class ProductNotFoundException extends BaseError {
  constructor(message = 'Product not found') {
    super(message, 404, ErrorCodes.PRODUCT_NOT_FOUND);
  }
}
