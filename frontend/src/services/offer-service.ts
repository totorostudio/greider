import { createAPI } from './api-service';
import { APIRoute } from '../const';
import { Guitar, Offer, SortBy, SortTypeQuery, Strings } from '../types';

// Создание экземпляра API
const api = createAPI();

export const getAllOffers = async (sortBy: SortBy, sortDirection: SortTypeQuery, checkboxTypes: Guitar[], checkboxStrings: Strings[]) => {
  try {
    const typeQuery = checkboxTypes.length > 0 ? `&types=${checkboxTypes.join(',')}` : '';
    const stringsQuery = checkboxStrings.length > 0 ? `&strings=${checkboxStrings.join(',')}` : '';
    const response = await api.get<Offer[]>(`${APIRoute.Offers}?sort=${sortBy}&direction=${sortDirection}${typeQuery}${stringsQuery}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOfferById = async (id: string) => {
  try {
    const response = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const offerDelete = async (id: string) => {
  try {
    const response = await api.delete<Offer>(`${APIRoute.Offers}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const offerUpdate = async (id: string, formData: FormData) => {
  try {
    const response = await api.patch<Offer>(`${APIRoute.Offers}/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const offerCreate = async (formData: FormData) => {
  try {
    const response = await api.post<Offer>(APIRoute.Offers, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
