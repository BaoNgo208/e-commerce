import { BaseError } from './BaseException';
import { ErrorCodes } from './ErrorCode';

export class ProductAlreadyExistsInSectionException extends BaseError {
  constructor(duplicateIds: string[]) {
    const message = `The following product IDs already exist in this section: ${duplicateIds.join(', ')}`;
    super(message, 400, ErrorCodes.PRODUCT_ALREADY_EXISTED_IN_SECTION);
  }
}
