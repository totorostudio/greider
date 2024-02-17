export const BACKEND_URL = 'http://localhost:5000';

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

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
