import {Helmet} from 'react-helmet-async';
import { Header, Footer } from '../../components';
import { useContext } from 'react';
import { AuthContext } from '../../context';
import { Link } from 'react-router-dom';
import './styles.css';

export function NotFoundScreen(): JSX.Element {
  const {isAuth} = useContext(AuthContext)!;

  return (
    <>
      <Helmet><title>Страница не найдена | Guitar Shop 2024</title></Helmet>
      <Header />
      <main className="page-content">
        <div className="container">
          <section className="error">
            <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
            <p className="error__text"> Возможно, страница была удалена или её вовсе не существовало.</p>
            {isAuth ? (
              <Link to="/offers">
                <button className="button button__error button--small button--black-border">Список товаров</button>
              </Link>
            ) : (
              <div className="buttons404Container">
                <Link to="/login">
                  <button className="button button__error button--small button--black-border buttons404">Войти</button>
                </Link>
                <Link to="/register">
                  <button className="button button__error button--small button--black-border buttons404">Зарегистрироваться</button>
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
