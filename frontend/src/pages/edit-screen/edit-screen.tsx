import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import dayjs from 'dayjs';
import { Guitar, Offer, Strings } from '../../types';
import { Header, Footer, Loading, Error, Message } from '../../components';
import { useFetching } from '../../hooks';
import { getOfferById, offerUpdate } from '../../services';
import { MESSAGE_SHORT_TIMEOUT, MESSAGE_LONG_TIMEOUT } from '../../const';

export function EditScreen(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [inputTitle, setInputTitle] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputArtikul, setInputArtikul] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [radioType, setRadioType] = useState<Guitar | undefined>(undefined);
  const [radioStrings, setRadioStrings] = useState<Strings | undefined>(undefined);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');

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
      setInputTitle(offer.title);
      setInputPrice(offer.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
      setInputArtikul(offer.artikul);
      setInputDescription(offer.description);
      setRadioType(offer.type);
      setRadioStrings(offer.strings);
    }
  }, [isLoading]);

  useEffect(() => {
    if (offer) {
      setInputPrice((prevInputPrice) =>
        prevInputPrice.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      );
    }
  }, [inputPrice]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id === undefined) return;
    try {
      const formData = new FormData();
      formData.append("title", inputTitle);
      formData.append("description", inputDescription);
      formData.append("type", radioType?.toString() || "");
      if (newImage) {
        formData.append("image", newImage);
      }
      formData.append("artikul", inputArtikul);
      formData.append("strings", radioStrings?.toString() || "");
      formData.append("price", inputPrice.replace(/\s/g, ''));
      const newOffer = await offerUpdate(id, formData);
      setMessage('Товар успешно обновлен');
      setTimeout(() => {
        setMessage('');
      }, MESSAGE_SHORT_TIMEOUT);
      setOffer(newOffer);
    } catch (error) {
      setMessage(`Ошибка обновления товара: ${error}`);
      setTimeout(() => {
        setMessage('');
      }, MESSAGE_LONG_TIMEOUT);
      console.error('Error in handleSubmit:', error);
    }
  }

  return (
    <>
      <Helmet><title>Редактировать товар | Guitar Shop 2024</title></Helmet>
      <Header />
      {message ?
        <Message message={message} />
      : (
        <>
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
                    <form onSubmit={handleSubmit} className="edit-item__form" action="#" method="post" encType="multipart/form-data">
                      <div className="edit-item__form-left">
                        <div className="edit-item-image edit-item__form-image">
                          <div className="edit-item-image__image-wrap">
                            {newImage ? (
                              <img className="edit-item-image__image" src={URL.createObjectURL(newImage)} width="145" height="250" alt="Selected" />
                            ) : (
                              <img className="edit-item-image__image" src={offer.image} srcSet={offer.image} width="145" height="250" alt={offer.title} />
                            )}
                          </div>
                          <div className="edit-item-image__btn-wrap">
                            <label className="button button--small button--black-border edit-item-image__btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                              <div>
                                <span>Заменить</span>
                              </div>
                              <input type="file" name="image" accept="image/*" onChange={(e) => setNewImage(e.target.files && e.target.files[0])} style={{ display: 'none' }} />
                            </label>
                            <button type="button" onClick={() => setNewImage(null)} className="button button--small button--black-border edit-item-image__btn">Удалить</button>
                          </div>
                        </div>
                        <div className="input-radio edit-item__form-radio"><span>Тип товара</span>
                          <input type="radio" onChange={(e) => setRadioType(e.target.value as Guitar)} id="guitar" name="guitar" value={Guitar.Acoustic} checked={radioType === Guitar.Acoustic} />
                          <label htmlFor="guitar">Акустическая гитара</label>
                          <input type="radio" onChange={(e) => setRadioType(e.target.value as Guitar)} id="el-guitar" name="el-guitar" value={Guitar.Electric} checked={radioType === Guitar.Electric} />
                          <label htmlFor="el-guitar">Электрогитара</label>
                          <input type="radio" onChange={(e) => setRadioType(e.target.value as Guitar)} id="ukulele" name="ukulele" value={Guitar.Ukulele}  checked={radioType === Guitar.Ukulele} />
                          <label htmlFor="ukulele">Укулеле</label>
                        </div>
                        <div className="input-radio edit-item__form-radio"><span>Количество струн</span>
                          <input type="radio" onChange={(e) => setRadioStrings(e.target.value as Strings)} id="string-qty-4" name="string-qty-4" value={Strings.Four} checked={radioStrings === Strings.Four} />
                          <label htmlFor="string-qty-4">4</label>
                          <input type="radio" onChange={(e) => setRadioStrings(e.target.value as Strings)} id="string-qty-6" name="string-qty-6" value={Strings.Six} checked={radioStrings === Strings.Six} />
                          <label htmlFor="string-qty-6">6</label>
                          <input type="radio" onChange={(e) => setRadioStrings(e.target.value as Strings)} id="string-qty-7" name="string-qty-7" value={Strings.Seven} checked={radioStrings === Strings.Seven} />
                          <label htmlFor="string-qty-7">7</label>
                          <input type="radio" onChange={(e) => setRadioStrings(e.target.value as Strings)} id="string-qty-12" name="string-qty-12" value={Strings.Twelve} checked={radioStrings === Strings.Twelve} />
                          <label htmlFor="string-qty-12">12</label>
                        </div>
                      </div>
                      <div className="edit-item__form-right">
                        <div className="custom-input edit-item__form-input">
                          <label><span>Дата добавления товара</span>
                            <input type="text" name="date" value={dayjs(offer.date.toLocaleString()).format('DD.MM.YYYY')} title="Дата в формате 00.00.0000" readOnly />
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
                        <Link to="/offers" className="button button--small edit-item__form-button" type="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>Вернуться к списку товаров</Link>
                      </div>
                    </form>
                  </div>
                </section>
              </main>
              <Footer />
            </>
          )}
        </>
      )};
    </>
  );
}
