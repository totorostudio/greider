import { Link } from 'react-router-dom';

export function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper"><Link to="/" className="header__logo logo"><img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" /></Link>
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
          <div className="header__container"><span className="header__user-name">Имя</span><Link to="/login" className="header__link"  aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg><span className="header__link-text">Вход</span></Link></div>
        </div>
      </div>
    </header>
  );
}
