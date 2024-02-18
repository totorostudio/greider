import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Offer } from '../../types';

type  ListCardProps = {
  offer: Offer;
  onDelete: (id: string) => void;
}

export function ListCard({ offer, onDelete }: ListCardProps): JSX.Element {
  const {_id, title, date, image, price} = offer;

  if (!_id) {
    throw new Error('Компонент ListCard: _id не определен');
  }

  return (
    <li className="catalog-item">
      <div className="catalog-item__data"><Link to={`/offer/${_id}`}><img src={image} srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" /></Link>
        <div className="catalog-item__data-wrapper">
          <Link to={`/offer/${_id}`} className="link"><p className="catalog-item__data-title">{title}</p></Link>
          <br />
          <p className="catalog-item__data-date">Дата добавления {dayjs(date.toLocaleString()).format('DD.MM.YYYY')}</p>
          <p className="catalog-item__data-price">{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link to={`/edit/${_id}`} className="button button--small button--black-border"aria-label="Редактировать товар">Редактировать</Link>
        <button onClick={() => onDelete(_id)} className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
      </div>
    </li>
  );
}
