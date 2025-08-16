import { Logger } from 'winston';

export abstract class BaseService {
  constructor(protected logger: Logger) {}

  protected getLogger(method: string, isAuthenticated: boolean = false) {
    return this.logger.child({ method, isAuthenticated });
  }
  protected throwAndLog(error: Error, logger = this.logger): never {
    logger.error(error);
    throw error;
  }
}
