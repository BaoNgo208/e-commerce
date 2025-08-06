import { Logger } from 'winston';
import { ProductNotFoundException } from '~/exceptions/ProductNotFoundException';

export abstract class BaseService {
  constructor(protected logger: Logger) {}

  protected getLogger(method: string, isAuthenticated: boolean = false) {
    return this.logger.child({ method, isAuthenticated });
  }
  protected throwAndLog(error: Error, logger = this.logger): never {
    logger.error(error);
    throw error;
  }
  protected getInfo(method: string, isValid: boolean = false) {
    return this.logger.child({
      method: method,
      isValidRequest: isValid ? `valid for ${method}` : String(new ProductNotFoundException())
    });
  }
}
