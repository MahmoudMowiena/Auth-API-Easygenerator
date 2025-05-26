export const ErrorMessages = {
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  INTERNAL_ERROR: 'Internal server error',
};

export type ErrorMessageKey = keyof typeof ErrorMessages;
