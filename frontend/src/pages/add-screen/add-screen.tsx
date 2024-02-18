import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import dayjs from 'dayjs';
import { Guitar, Strings } from '../../types';
import { Header, Footer, Message } from '../../components';
import { offerCreate } from '../../services';

export function AddScreen(): JSX.Element {
  const [inputTitle, setInputTitle] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputArtikul, setInputArtikul] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [radioType, setRadioType] = useState<Guitar | undefined>(undefined);
  const [radioStrings, setRadioStrings] = useState<Strings | undefined>(undefined);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setInputPrice((prevInputPrice) =>
      prevInputPrice.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    );
  }, [inputPrice]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      await offerCreate(formData);
      setMessage('Товар успешно добавлен');
      setTimeout(() => {
        setMessage('');
        navigate('/offers');
      }, 750);
    } catch (error) {
      setMessage(`Ошибка добавления товара: ${error}`);
      setTimeout(() => {
        setMessage('');
      }, 1500);
      console.error('Error in handleSubmit:', error);
    }
  }

  return (
    <>
      <Helmet><title>Добавить товар | Guitar Shop 2024</title></Helmet>
      <Header />
      {message ?
        <Message message={message} />
      : (
        <>
          <main className="page-content">
            <section className="edit-item">
              <div className="container">
                <h1 className="edit-item__title">Новый товар</h1>
                <ul className="breadcrumbs">
                  <li className="breadcrumbs__item">
                    <span className="link" style={{ cursor: 'default', color: 'inherit' }}>Вход</span>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link to="/offers" className="link">Список товаров</Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <span className="link" style={{ cursor: 'default', color: 'inherit' }}>Новый товар</span>
                  </li>
                </ul>
                <form onSubmit={handleSubmit} className="edit-item__form" action="#" method="post" encType="multipart/form-data">
                  <div className="edit-item__form-left">
                    <div className="edit-item-image edit-item__form-image">
                      <div className="edit-item-image__image-wrap">
                        {newImage ? (
                          <img className="edit-item-image__image" src={URL.createObjectURL(newImage)} width="145" height="250" alt="Selected" />
                        ) : ('')}
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
                      <input type="radio" id="guitar" name="guitar" value={Guitar.Acoustic} checked={radioType === Guitar.Acoustic} onChange={(e) => setRadioType(e.target.value as Guitar)}/>
                      <label htmlFor="guitar">Акустическая гитара</label>
                      <input type="radio" id="el-guitar" name="el-guitar" value={Guitar.Electric} checked={radioType === Guitar.Electric} onChange={(e) => setRadioType(e.target.value as Guitar)} />
                      <label htmlFor="el-guitar">Электрогитара</label>
                      <input type="radio" id="ukulele" name="ukulele" value={Guitar.Ukulele}  checked={radioType === Guitar.Ukulele} onChange={(e) => setRadioType(e.target.value as Guitar)}/>
                      <label htmlFor="ukulele">Укулеле</label>
                    </div>
                    <div className="input-radio edit-item__form-radio"><span>Количество струн</span>
                      <input type="radio" id="string-qty-4" name="string-qty-4" value={Strings.Four} checked={radioStrings === Strings.Four} onChange={(e) => setRadioStrings(e.target.value as Strings)}/>
                      <label htmlFor="string-qty-4">4</label>
                      <input type="radio" id="string-qty-6" name="string-qty-6" value={Strings.Six} checked={radioStrings === Strings.Six} onChange={(e) => setRadioStrings(e.target.value as Strings)}/>
                      <label htmlFor="string-qty-6">6</label>
                      <input type="radio" id="string-qty-7" name="string-qty-7" value={Strings.Seven} checked={radioStrings === Strings.Seven} onChange={(e) => setRadioStrings(e.target.value as Strings)}/>
                      <label htmlFor="string-qty-7">7</label>
                      <input type="radio" id="string-qty-12" name="string-qty-12" value={Strings.Twelve} checked={radioStrings === Strings.Twelve} onChange={(e) => setRadioStrings(e.target.value as Strings)}/>
                      <label htmlFor="string-qty-12">12</label>
                    </div>
                  </div>
                  <div className="edit-item__form-right">
                    <div className="custom-input edit-item__form-input">
                      <label><span>Дата добавления товара</span>
                        <input type="text" name="date" value={dayjs().format('DD.MM.YYYY')} title="Дата в формате 00.00.0000" readOnly />
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
  );
}
