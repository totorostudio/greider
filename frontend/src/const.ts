export const BACKEND_URL = 'http://localhost:5000';

export const MESSAGE_SHORT_TIMEOUT = 750;
export const MESSAGE_LONG_TIMEOUT = 750;

export enum APIRoute {
  Offers = '/offers',
  Login = '/users/login',
  Register = '/users/register',
}

export enum AppRoute {
  Login = '/login',
  Logout = '/logout',
  Register = '/register',
  OffersList = '/offers',
  Offer = '/offer/:id',
  Add = '/add',
  Edit = '/edit/:id',
}
