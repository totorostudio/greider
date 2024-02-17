import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute} from '../../const';
import {OffersListScreen, LoginScreen, RegisterScreen, OfferScreen, AddScreen, EditScreen, NotFoundScreen} from '../../pages';
import { Loading, ScrollToTop } from '../';
import { AuthContext } from '../../context/auth-context';
import { useAuth } from '../../hooks';

function App(): JSX.Element {
  const {isAuth, setIsAuth, isLoading} = useAuth();

  if (isLoading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth}}>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {isAuth ? (
              <>
                <Route path="" element={<Navigate to={AppRoute.OffersList} />} />
                <Route path={AppRoute.Login} element={<Navigate to={AppRoute.OffersList} />} />
                <Route path={AppRoute.Register} element={<Navigate to={AppRoute.OffersList} />} />
                <Route path={AppRoute.OffersList} element={<OffersListScreen />} />
                <Route path={AppRoute.Offer} element={<OfferScreen />} />
                <Route path={AppRoute.Add} element={<AddScreen />} />
                <Route path={AppRoute.Edit} element={<EditScreen />} />
                <Route path="*" element={<NotFoundScreen />} />
              </>
            ) : (
              <>
                <Route path="" element={<Navigate to={AppRoute.Login} />} />
                <Route path={AppRoute.Login} element={<LoginScreen />} />
                <Route path={AppRoute.Register} element={<RegisterScreen />} />
                <Route path={AppRoute.OffersList} element={<Navigate to={AppRoute.Login} />} />
                <Route path={AppRoute.Offer} element={<Navigate to={AppRoute.Login} />} />
                <Route path={AppRoute.Add} element={<Navigate to={AppRoute.Login} />} />
                <Route path={AppRoute.Edit} element={<Navigate to={AppRoute.Login} />} />
                <Route path={AppRoute.Logout} element={<Navigate to={AppRoute.Login} />} />
                <Route path="*" element={<NotFoundScreen />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </AuthContext.Provider>
  );
}

export default App;
