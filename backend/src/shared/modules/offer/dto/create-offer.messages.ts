import { OfferTitleLength, DescriptionLength, PriceValue, IMAGE_MAX_LENGTH, ArtikulLength } from '../../../const/index.js';

export const CreateOfferValidationMessage = {
  title: {
    minLength: `Минимальная длина заголовка ${OfferTitleLength.Min} символов`,
    maxLength: `Максимальная длина заголовка ${OfferTitleLength.Max} символов`,
  },
  description: {
    minLength: `Минимальная длина описания ${DescriptionLength.Min} символов`,
    maxLength: `Максимальная длина описания ${DescriptionLength.Max} символов`,
  },
  date: {
    invalidFormat: 'Дата создания товара должна быть в ISO date формате',
  },
  type: {
    invalid: 'Тип гитары не соответствует допустимым значениям',
  },
  image: {
    maxLength: `Слишком длинный URL изображения (максимум ${IMAGE_MAX_LENGTH} символов`,
  },
  artikul: {
    minLength: `Минимальная длина описания ${ArtikulLength.Min} символов`,
    maxLength: `Максимальная длина описания ${ArtikulLength.Max} символов`,
  },
  strings: {
    invalidFormat: 'Количество струн не соответствет допустимому набору значений',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: `Minimum price is ${PriceValue.Min}`,
    maxValue: `Maximum price is ${PriceValue.Max}`,
  },
} as const;
