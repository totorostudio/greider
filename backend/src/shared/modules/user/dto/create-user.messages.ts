import { UserNameLength, UserPasswordLength } from '../../../const/index.js';

export const CreateUserMessages = {
  name: {
    invalidFormat: 'name is required',
    lengthField: `min length is ${UserNameLength.Min}, max is ${UserNameLength.Max}`,
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: `min length for password is ${UserPasswordLength.Min}, max is ${UserPasswordLength.Max}`
  },
} as const;
