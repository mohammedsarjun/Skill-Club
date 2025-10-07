export const ERROR_MESSAGES = {
  AUTH: {
    ALREADY_EXIST: 'Email or phone number already exists',
    INVALID_CREDENTIALS: 'Invalid username or password',
    TOKEN_EXPIRED: 'Token has expired',
    UNAUTHORIZED: 'You are not authorized to access this resource',
    INCORRECT_PASSWORD: 'Incorrect Password',
    NOT_FOUND: 'Email does not exist',
  },
  CATEGORY: {
    ALREADY_EXIST: 'Category with this name already exists',
  },
  SKILL: {
    ALREADY_EXIST: 'Skill with this name already exists',
    NOT_FOUND: 'Skill not Found',
  },
  SPECIALITY: {
    ALREADY_EXIST: 'Speciality with this name already exists',
  },
  GENERAL: {
    SERVER_ERROR: 'Something went wrong, please try again later',
    BAD_REQUEST: 'Invalid request',
  },
  TOKEN: {
    INVALID_TOKEN: 'Invalid or Expired Token',
  },
  OTP: {
    EXPIRED: 'OTP has expired',
    INCORRECT_OTP: 'Enter otp is incorrect',
  },
  CLIENT: {
    FAILED_CREATE: 'Failed to create client profile',
    FETCH_FAILED: 'Failed to fetch Client data',
    NOT_FOUND: "Client or Client profile doesn't exist",
  },
  FREELANCER: {
    FAILED_CREATE: 'Failed to create Freelancer profile',
    NOT_FOUND: "Freelancer or Freelancer profile doesn't exist",
    FETCH_FAILED: 'Failed to fetch Freelancer data',
  },
  USER: {
    NOT_FOUND: 'User Not Found',
    ID_REQUIRED: 'User Id Required',
  },
};
