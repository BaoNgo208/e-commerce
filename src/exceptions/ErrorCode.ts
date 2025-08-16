export const ErrorCodes = {
  // Product errors
  PRODUCT_NOT_FOUND: 'PRD-NF-0001',
  PRODUCT_ALREADY_EXISTED_IN_SECTION: 'PRD-AE-0002',
  PRODUCT_INACTIVE: 'PRD-IN-0003',

  // User errors
  USER_NOT_FOUND: 'USR-NF-0001',
  USER_UNVERIFIED: 'USR-UV-0002',
  USER_ALREADY_EXISTED: 'USR-AE-0003',
  EMAIL_ALREADY_USED: 'USR-AE-0004',
  INVALID_PASSWORD: 'USR-IP-0005',

  // Order errors
  ORDER_NOT_FOUND: 'ORD-NF-0001',

  // Product section errors
  PRODUCT_SECTION_NOT_FOUND: 'SEC-NF-0001',

  // Validation
  VALIDATION_ERROR: 'VAL-ER-0001',

  // Token/Auth errors
  TOKEN_MISSING: 'AUT-MS-0001',
  TOKEN_INVALID: 'AUT-ER-0002',
  TOKEN_EXPIRED: 'AUT-EX-0003',

  // System errors
  UNKNOWN_ERROR: 'SYS-ER-0001'
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
