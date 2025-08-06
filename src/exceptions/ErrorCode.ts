export const ErrorCodes = {
  // Product errors
  PRODUCT_NOT_FOUND: 10100,
  PRODUCT_ALREADY_EXISTED_IN_SECTION: 10101,
  PRODUCT_INACTIVE: 10102,

  // User errors
  USER_NOT_FOUND: 20100,
  USER_UNVERIFIED: 20101,

  // Order errors
  ORDER_NOT_FOUND: 30100,

  // Product section errors
  PRODUCT_SECTION_NOT_FOUND: 40100,

  // Validation
  VALIDATION_ERROR: 40000,

  // System errors
  UNKNOWN_ERROR: 90000
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
