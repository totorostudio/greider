import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types';
import { useFetching } from '../../hooks';
import { Header, Footer, ListCard, Loading, Error } from '../../components';
import { getAllOffers, offerDelete } from '../../services';

export function OffersListScreen(): JSX.Element {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [message, setMessage] = useState<string>('');

  const { fetching: fetchOffers, isLoading, error } = useFetching(async () => {
    const offers = await getAllOffers();
    setOffers(offers);
  })

  useEffect(() => {
    fetchOffers();
  }, []);

    const handleDelete = async (offerId: string) => {
    try {
      const delResponse = await offerDelete(offerId);
      console.log(delResponse);
      const updatedOffers = offers.filter((offer) => offer._id !== offerId);
      setOffers(updatedOffers);
      setMessage('Товар успешно удален');
      setTimeout(() => {
        setMessage('');
      }, 1000);
    } catch (error) {
      console.error(`Error delete offer ${offerId}:`, error);
      setMessage('Ошибка удаления товара');
      setTimeout(() => {
        setMessage('');
      }, 1000);
    }
  }

  return (
    <>
      <Helmet><title>Список товаров | Guitar Shop 2024</title></Helmet>
      <Header />
      {isLoading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          <>
          <main className="page-content">
            <section className="product-list">
              <div className="container">
                <h1 className="product-list__title">Список товаров</h1>
                <ul className="breadcrumbs">
                  <li className="breadcrumbs__item"><a className="link">Вход</a>
                  </li>
                  <li className="breadcrumbs__item"><a className="link">Товары</a>
                  </li>
                </ul>
                <div className="catalog">
                  <form className="catalog-filter" action="#" method="post">
                    <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
                    <fieldset className="catalog-filter__block">
                      <legend className="catalog-filter__block-title">Тип гитар</legend>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
                        <label htmlFor="acoustic">Акустические гитары</label>
                      </div>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input className="visually-hidden" type="checkbox" id="electric" name="electric" checked />
                        <label htmlFor="electric">Электрогитары</label>
                      </div>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked />
                        <label htmlFor="ukulele">Укулеле</label>
                      </div>
                    </fieldset>
                    <fieldset className="catalog-filter__block">
                      <legend className="catalog-filter__block-title">Количество струн</legend>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" checked />
                        <label htmlFor="4-strings">4</label>
                      </div>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" checked />
                        <label htmlFor="6-strings">6</label>
                      </div>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
                        <label htmlFor="7-strings">7</label>
                      </div>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled />
                        <label htmlFor="12-strings">12</label>
                      </div>
                    </fieldset>
                    <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
                  </form>
                  <div className="catalog-sort">
                    <h2 className="catalog-sort__title">Сортировать:</h2>
                    <div className="catalog-sort__type">
                      <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене">по дате</button>
                      <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
                    </div>
                    {message && <h3 className="catalog-sort__title">{message}</h3>}
                    <div className="catalog-sort__order">
                      <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
                      <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию"></button>
                    </div>
                  </div>
                  <div className="catalog-cards">
                    <ul className="catalog-cards__list">
                      {offers.map((offer) => (
                        <ListCard key={offer._id} offer={offer} onDelete={handleDelete} />
                      ))}
                      {offers.length === 0 &&
                        <li className="catalog-item">
                              <p className="catalog-item__data-title">Товаров нет</p>
                        </li>
                      }
                    </ul>
                  </div>
                </div>
                <Link to="/add">
                  <button className="button product-list__button button--red button--big">Добавить новый товар</button>
                </Link>
                <div className="pagination product-list__pagination">
                  <ul className="pagination__list">
                    <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
                    </li>
                    <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
                    </li>
                    <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
                    </li>
                    <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
