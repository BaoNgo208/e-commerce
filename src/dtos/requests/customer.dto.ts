import { Expose } from 'class-transformer';

export class CreateCustomerRequest {
  @Expose({ name: 'email' })
  email!: string;

  @Expose({ name: 'password_hash' })
  password_hash?: string;
}
