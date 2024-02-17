import { createAPI } from './api-service';
import { APIRoute } from '../const';
import { AuthData, User } from '../types';

// Создание экземпляра API
const api = createAPI();

export const userLogin = async (authData: AuthData) => {
  const {email, password} = authData;
  try {
    const response = await api.post<User>(APIRoute.Login, {email, password});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userRegister = async (authData: AuthData) => {
  const {name, email, password} = authData;
  try {
    const response = await api.post<User>(APIRoute.Register, {name, email, password});
    return response.data;
  } catch (error) {
    throw error;
  }
};
