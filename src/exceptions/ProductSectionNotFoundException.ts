import { BaseError } from './BaseException';
import { ErrorCodes } from './ErrorCode';

export class ProductSectionNotFoundException extends BaseError {
  constructor(message = 'Product section not found') {
    super(message, 404, ErrorCodes.PRODUCT_SECTION_NOT_FOUND);
  }
}
