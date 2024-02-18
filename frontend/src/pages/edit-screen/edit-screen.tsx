import { Helmet } from 'react-helmet-async';
import {Header, Footer, Loading, Error} from '../../components';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetching } from '../../hooks';
import { getOfferById } from '../../services';
import { Offer } from '../../types';
import dayjs from 'dayjs';

export function EditScreen(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [inputDate, setInputDate] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputArtikul, setInputArtikul] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [radioType, setRadioType] = useState('');
  const [radioStrings, setRadioStrings] = useState('');
  const [offer, setOffer] = useState<Offer | null>(null);
  const { fetching: fetchOffer, isLoading, error } = useFetching(async () => {
    if (id === undefined) return;
    const response = await getOfferById(id);
    setOffer(response);
  })

  useEffect(() => {
    fetchOffer();
  }, []);

  useEffect(() => {
    if (offer) {
      console.log(offer);
      setInputDate(dayjs(offer.date.toLocaleString()).format('DD.MM.YYYY'));
      setInputTitle(offer.title);
      setInputPrice(offer.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
      setInputArtikul(offer.artikul);
      setInputDescription(offer.description);
      setRadioType(offer.type);
      setRadioStrings(offer.strings);
    }
  }, [isLoading]);

  useEffect(() => {
    console.log(radioType);
    console.log(radioStrings);
    console.log(inputDescription);
  }, [offer, radioType, radioStrings, inputDescription]);

  return (
    <>
      <Helmet><title>Редактировать товар | Guitar Shop 2024</title></Helmet>
      <Header />
      {isLoading || !offer ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          <main className="page-content">
            <section className="edit-item">
              <div className="container">
                <h1 className="edit-item__title">{offer.title}</h1>
                <ul className="breadcrumbs">
                  <li className="breadcrumbs__item">
                    <span className="link" style={{ cursor: 'default', color: 'inherit' }}>Вход</span>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link to="/offers" className="link">Список товаров</Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <span className="link" style={{ cursor: 'default', color: 'inherit' }}>{offer.title}</span>
                  </li>
                  <li className="breadcrumbs__item">
                    <span className="link" style={{ cursor: 'default', color: 'inherit' }}>Редактировать</span>
                  </li>
                </ul>
                <form className="edit-item__form" action="#" method="get">
                  <div className="edit-item__form-left">
                    <div className="edit-item-image edit-item__form-image">
                      <div className="edit-item-image__image-wrap"><img className="edit-item-image__image" src={offer.image} srcSet={offer.image} width="133" height="332" alt={offer.title} />
                      </div>
                      <div className="edit-item-image__btn-wrap">
                        <button className="button button--small button--black-border edit-item-image__btn">Заменить</button>
                        <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
                      </div>
                    </div>
                    <div className="input-radio edit-item__form-radio"><span>Тип товара</span>
                      <input type="radio" id="guitar" name="guitar" value="Акустика" checked={radioType === 'Акустика'} onChange={(e) => setRadioType(e.target.value)}/>
                      <label htmlFor="guitar">Акустическая гитара</label>
                      <input type="radio" id="el-guitar" name="el-guitar" value="Электро" checked={radioType === 'Электро'} onChange={(e) => setRadioType(e.target.value)} />
                      <label htmlFor="el-guitar">Электрогитара</label>
                      <input type="radio" id="ukulele" name="ukulele" value="Укулеле"  checked={radioType === 'Укулеле'} onChange={(e) => setRadioType(e.target.value)}/>
                      <label htmlFor="ukulele">Укулеле</label>
                    </div>
                    <div className="input-radio edit-item__form-radio"><span>Количество струн</span>
                      <input type="radio" id="string-qty-4" name="string-qty-4" value="4" checked={radioStrings === '4'} onChange={(e) => setRadioStrings(e.target.value)}/>
                      <label htmlFor="string-qty-4">4</label>
                      <input type="radio" id="string-qty-6" name="string-qty-6" value="6" checked={radioStrings === '6'} onChange={(e) => setRadioStrings(e.target.value)}/>
                      <label htmlFor="string-qty-6">6</label>
                      <input type="radio" id="string-qty-7" name="string-qty-7" value="7" checked={radioStrings === '7'} onChange={(e) => setRadioStrings(e.target.value)}/>
                      <label htmlFor="string-qty-7">7</label>
                      <input type="radio" id="string-qty-12" name="string-qty-12" value="12" checked={radioStrings === '12'} onChange={(e) => setRadioStrings(e.target.value)}/>
                      <label htmlFor="string-qty-12">12</label>
                    </div>
                  </div>
                  <div className="edit-item__form-right">
                    <div className="custom-input edit-item__form-input">
                      <label><span>Дата добавления товара</span>
                        <input type="text" name="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} placeholder="Дата в формате 00.00.0000" title="Дата в формате 00.00.0000" />
                      </label>
                      <p>Заполните поле</p>
                    </div>
                    <div className="custom-input edit-item__form-input">
                      <label><span>Наименование товара</span>
                        <input type="text" name="title" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} placeholder="Наименование" />
                      </label>
                      <p>Заполните поле</p>
                    </div>
                    <div className="custom-input edit-item__form-input edit-item__form-input--price">
                      <label><span>Цена товара</span>
                        <input type="text" name="price" value={inputPrice} onChange={(e) => setInputPrice(e.target.value)} placeholder="Цена в формате 00 000" title="Цена в формате 00 000" />
                      </label>
                      <p>Заполните поле</p>
                    </div>
                    <div className="custom-input edit-item__form-input">
                      <label><span>Артикул товара</span>
                        <input type="text" name="sku" value={inputArtikul} onChange={(e) => setInputArtikul(e.target.value)} placeholder="Артикул товара" />
                      </label>
                      <p>Заполните поле</p>
                    </div>
                    <div className="custom-textarea edit-item__form-textarea">
                      <label><span>Описание товара</span>
                        <textarea name="description" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />
                      </label>
                      <p>Заполните поле</p>
                    </div>
                  </div>
                  <div className="edit-item__form-buttons-wrap">
                    <button className="button button--small edit-item__form-button" type="submit">Сохранить изменения</button>
                    <button className="button button--small edit-item__form-button" type="button">Вернуться к списку товаров</button>
                  </div>
                </form>
              </div>
            </section>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
