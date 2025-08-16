import { BaseService } from './base.service';
import { productLogger } from '~/configs/logger';
import { CreateCustomerRequest } from '~/dtos/requests/customer.dto';
import prisma from '~/utils/prisma/prisma';
import { v4 as uuidv4 } from 'uuid';

export class UserService extends BaseService {
  constructor() {
    super(productLogger);
  }

  async getByEmail(email: string) {
    return prisma.users.findFirst({
      where: {
        email: email
      },
      include: { role: true }
    });
  }
  async create(createCustomerRequest: CreateCustomerRequest) {
    return await prisma.users.create({
      data: {
        id: uuidv4(),
        email: createCustomerRequest.email,
        password_hash: createCustomerRequest.password_hash
      }
    });
  }
}
