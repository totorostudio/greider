import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context';
import { useContext } from 'react';
import { dropToken } from '../../services';
import { getNameFromToken } from '../../utils/get-username-from-jwt';

export function Header(): JSX.Element {
  const {isAuth, setIsAuth} = useContext(AuthContext)!;
  const currentPath = useLocation().pathname;
  let username = '';

  const logout = () => {
    dropToken();
    setIsAuth(false);
  }

  if (isAuth) {
    username = getNameFromToken();
  }

  return (
    <header className={`header ${isAuth ? 'header--admin' : ''}`} id="header">
      <div className="container">
        <div className="header__wrapper"><Link to="/" className="header__logo logo"><img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" /></Link>
        {isAuth ? (
          <>
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item">
                  <Link to="/offers" className="link main-nav__link">Список товаров</Link>
                </li>
                <li className="main-nav__item">
                  <Link to="/add" className="link main-nav__link">Добавить товар</Link>
                </li>
              </ul>
            </nav>
            <div className="header__container">
                <span className="header__user-name">{username}</span>
                <Link to="/logout" onClick={logout} className="header__link" title="Выйти" aria-label="Выйти">
                  <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-account"></use>
                  </svg><span className="header__link-text">Выход</span>
                </Link>
            </div>
          </>
        ) : (
          <div className="header__container">
            {currentPath === '/login' ? (
              <Link to="/register" onClick={logout} className="header__link">
                <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-account"></use>
                </svg>
                <span className="header__link-text" style={{ width: '125px' }}>Зарегистрироваться</span>
              </Link>
            ) : (
              <Link to="/login" onClick={logout} className="header__link">
                <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-account"></use>
                </svg>
                <span className="header__link-text">Войти</span>
              </Link>
            )}

          </div>
        )}
        </div>
      </div>
    </header>
  );
}
