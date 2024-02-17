import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute} from '../../const';
import {OffersListScreen, LoginScreen, RegisterScreen, OfferScreen, AddScreen, EditScreen, NotFoundScreen} from '../../pages';
//import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="" element={<Navigate to={AppRoute.OffersList} />} />
          <Route path={AppRoute.OffersList} element={<OffersListScreen />} />
          <Route path={AppRoute.Login} element={<LoginScreen />} />
          <Route path={AppRoute.Register} element={<RegisterScreen />} />
          <Route path={AppRoute.Offer} element={<OfferScreen />} />
          <Route path={AppRoute.Add} element={<AddScreen />} />
          <Route path={AppRoute.Edit} element={<EditScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
