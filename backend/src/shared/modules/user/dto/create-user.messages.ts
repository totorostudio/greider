import { UserNameLength, UserPasswordLength } from '../../../const/index.js';

export const CreateUserMessages = {
  name: {
    invalidFormat: 'введите имя',
    lengthField: `минимальная длина имени ${UserNameLength.Min}, максимальная ${UserNameLength.Max} символов`,
  },
  email: {
    invalidFormat: 'введенное значение почты некорректно'
  },
  password: {
    invalidFormat: 'введите пароль',
    lengthField: `минимальная длина пароля ${UserPasswordLength.Min}, максимальная ${UserPasswordLength.Max} символов`
  },
} as const;
