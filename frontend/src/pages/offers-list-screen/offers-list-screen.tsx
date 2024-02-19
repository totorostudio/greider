import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useFetching } from '../../hooks';
import { Header, Footer, ListCard, Loading, Error } from '../../components';
import { getAllOffers, offerDelete } from '../../services';
import { Guitar, Offer, SortBy, SortTypeQuery, Strings } from '../../types';

export function OffersListScreen(): JSX.Element {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [message, setMessage] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Date);
  const [sortDirection, setSortDirection] = useState<SortTypeQuery>(SortTypeQuery.Up);
  const [checkboxTypes, setCheckboxTypes] = useState<Guitar[]>([]);
  const [checkboxStrings, setCheckboxStrings] = useState<Strings[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { fetching: fetchOffers, isLoading, error } = useFetching(async () => {
    const {offers, totalPages} = await getAllOffers(pageNumber, sortBy, sortDirection, checkboxTypes, checkboxStrings);
    setPageNumber(parseInt(totalPages, 10));
    setOffers(offers);
  })

  useEffect(() => {
    fetchOffers();
  }, [sortBy, sortDirection, checkboxTypes, checkboxStrings]);

    const handleDelete = async (offerId: string) => {
    try {
      await offerDelete(offerId);
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

  const handleGuitarCheckboxChange = (value: Guitar) => {
    if (checkboxTypes.includes(value)) {
      setCheckboxTypes(checkboxTypes.filter(item => item !== value));
    } else {
      setCheckboxTypes([...checkboxTypes, value]);
    }
  };

  const handleStringsCheckboxChange = (value: Strings) => {
    if (checkboxStrings.includes(value)) {
      setCheckboxStrings(checkboxStrings.filter(item => item !== value));
    } else {
      setCheckboxStrings([...checkboxStrings, value]);
    }
  };

  const handleClearButton = (event: React.FormEvent) => {
    event.preventDefault();
    setCheckboxTypes([]);
    setCheckboxStrings([]);
  };

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
                  <li className="breadcrumbs__item">
                    <span className="link" style={{ cursor: 'default', color: 'inherit' }}>Вход</span>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="link">Список товаров</a>
                  </li>
                </ul>
                <div className="catalog">
                  <form className="catalog-filter" action="#" method="post">
                    <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
                    <fieldset className="catalog-filter__block">
                      <legend className="catalog-filter__block-title">Тип гитар</legend>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input type="checkbox" onChange={() => handleGuitarCheckboxChange(Guitar.Acoustic)} value={Guitar.Acoustic} className="visually-hidden" id="acoustic" name="acoustic" checked={checkboxTypes.includes(Guitar.Acoustic)}/>
                        <label htmlFor="acoustic">Акустические гитары</label>
                      </div>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input type="checkbox" onChange={() => handleGuitarCheckboxChange(Guitar.Electric)} value={Guitar.Electric} className="visually-hidden" id="electric" name="electric" checked={checkboxTypes.includes(Guitar.Electric)} />
                        <label htmlFor="electric">Электрогитары</label>
                      </div>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input type="checkbox" onChange={() => handleGuitarCheckboxChange(Guitar.Ukulele)} value={Guitar.Ukulele} className="visually-hidden" id="ukulele" name="ukulele" checked={checkboxTypes.includes(Guitar.Ukulele)} />
                        <label htmlFor="ukulele">Укулеле</label>
                      </div>
                    </fieldset>
                    <fieldset className="catalog-filter__block">
                      <legend className="catalog-filter__block-title">Количество струн</legend>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input type="checkbox" onChange={() => handleStringsCheckboxChange(Strings.Four)} value={Strings.Four} className="visually-hidden" id="4-strings" name="4-strings" checked={checkboxStrings.includes(Strings.Four)} />
                        <label htmlFor="4-strings">4</label>
                      </div>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input type="checkbox" onChange={() => handleStringsCheckboxChange(Strings.Six)} value={Strings.Six} className="visually-hidden" id="6-strings" name="6-strings" checked={checkboxStrings.includes(Strings.Six)} />
                        <label htmlFor="6-strings">6</label>
                      </div>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input type="checkbox" onChange={() => handleStringsCheckboxChange(Strings.Seven)} value={Strings.Seven} className="visually-hidden" id="7-strings" name="7-strings" checked={checkboxStrings.includes(Strings.Seven)} />
                        <label htmlFor="7-strings">7</label>
                      </div>
                      <div className="form-checkbox catalog-filter__block-item">
                        <input type="checkbox" onChange={() => handleStringsCheckboxChange(Strings.Twelve)} value={Strings.Twelve} className="visually-hidden" id="12-strings" name="12-strings" checked={checkboxStrings.includes(Strings.Twelve)} />
                        <label htmlFor="12-strings">12</label>
                      </div>
                    </fieldset>
                    <button onClick={handleClearButton} className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
                  </form>
                  <div className="catalog-sort">
                    <h2 className="catalog-sort__title">Сортировать:</h2>
                    <div className="catalog-sort__type">
                      <button onClick={() => setSortBy(SortBy.Date)} className={`catalog-sort__type-button ${sortBy === SortBy.Date ? 'catalog-sort__type-button--active' : ''}`} aria-label="по дате">по дате</button>
                      <button onClick={() => setSortBy(SortBy.Price)} className={`catalog-sort__type-button ${sortBy === SortBy.Price ? 'catalog-sort__type-button--active' : ''}`} aria-label="по цене">по цене</button>
                    </div>
                    {message && <h3 className="catalog-sort__title">{message}</h3>}
                    <div className="catalog-sort__order">
                      <button onClick={() => setSortDirection(SortTypeQuery.Up)} className={`catalog-sort__order-button catalog-sort__order-button--up ${sortDirection === SortTypeQuery.Up ? 'catalog-sort__order-button--active' : ''}`} aria-label="По возрастанию"></button>
                      <button onClick={() => setSortDirection(SortTypeQuery.Down)} className={`catalog-sort__order-button catalog-sort__order-button--down ${sortDirection === SortTypeQuery.Down ? 'catalog-sort__order-button--active' : ''}`} aria-label="По убыванию"></button>
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
                {/*<div className="pagination product-list__pagination">
                  <ul className="pagination__list">
                    <li className={`pagination__page ${pageNumber === 1 ? 'pagination__page--active' : ''}`}>
                      <a className="link pagination__page-link" href="1">1</a>
                    </li>
                    <li className="pagination__page">
                      <a className="link pagination__page-link" href="2">2</a>
                    </li>
                    <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
                    </li>
                    <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
                    </li>
                  </ul>
                </div>*/}
              </div>
            </section>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
