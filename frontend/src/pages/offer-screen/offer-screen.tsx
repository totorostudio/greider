import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Header, Footer, Loading, Error, Characteristics } from '../../components';
import { Offer } from '../../types';
import { useEffect, useState } from 'react';
import { useFetching } from '../../hooks';
import { getOfferById } from '../../services';
import { Description } from '../../components/tabs/description';

export function OfferScreen(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('characteristics');
  const [offer, setOffer] = useState<Offer | null>(null);
  const { fetching: fetchOffer, isLoading, error } = useFetching(async () => {
    if (id === undefined) return;
    const response = await getOfferById(id);
    setOffer(response);
  })

  useEffect(() => {
    fetchOffer();
  }, []);

  return (
    <>
      <Helmet><title>Страница товара с id ${id} | Guitar Shop 2024</title></Helmet>
      <Header />
      {isLoading || !offer ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          <>
            <main className="page-content">
              <div className="container">
                <h1 className="page-content__title title title--bigger">Товар</h1>
                <ul className="breadcrumbs page-content__breadcrumbs">
                  <li className="breadcrumbs__item">
                    <span className="link" style={{ cursor: 'default', color: 'inherit' }}>Вход</span>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link to="/offers" className="link">Список товаров</Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <span className="link" style={{ cursor: 'default', color: 'inherit' }}>{offer.title}</span>
                  </li>
                </ul>
                <div className="product-container"><img className="product-container__img" src={offer.image} srcSet={offer.image} width="90" height="235" alt="" />
                  <div className="product-container__info-wrapper">
                    <h2 className="product-container__title title title--big title--uppercase">{offer.title}</h2>
                    <br />
                    <br />
                    <div className="tabs">
                      {activeTab === 'characteristics' ? (
                        <>
                          <button className="button button--medium tabs__button active" disabled onClick={() => setActiveTab('characteristics')}>Характеристики</button>
                          <button className="button button--black-border button--medium tabs__button" onClick={() => setActiveTab('description')}>Описание</button>
                          <Characteristics artikul={offer.artikul} type={offer.type} strings={offer.strings} />
                        </>
                      ) : (
                        <>
                          <button className="button button--black-border button--medium tabs__button" onClick={() => setActiveTab('characteristics')}>Характеристики</button>
                          <button className="button button--medium tabs__button  active" disabled onClick={() => setActiveTab('description')}>Описание</button>
                          <Description description={offer.description} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </>
        )}
    </>
  );
}
