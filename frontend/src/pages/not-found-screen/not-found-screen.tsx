import {Helmet} from 'react-helmet-async';
import { Header, Footer } from '../../components';

export function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Helmet><title>Страница не найдена | Guitar Shop 2024</title></Helmet>
      <Header />
      <main className="page-content">
        <div className="container">
          <section className="error">
            <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
            <p className="error__text"> Возможно, страница была удалена или её вовсе не существовало.</p>
            <button className="button button__error button--small button--black-border">Продолжить покупки</button>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
