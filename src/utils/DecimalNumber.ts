import Decimal from 'decimal.js';

export class DecimalNumber extends Decimal {
  constructor(value?: Decimal.Value) {
    super(value != null ? value : 0);
  }
}
