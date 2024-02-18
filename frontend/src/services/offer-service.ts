import { createAPI } from './api-service';
import { APIRoute } from '../const';
import { Offer } from '../types';

// Создание экземпляра API
const api = createAPI();

export const getAllOffers = async () => {
  try {
    const response = await api.get<Offer[]>(APIRoute.Offers);
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
