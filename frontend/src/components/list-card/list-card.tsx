import { Link } from 'react-router-dom';
import { Offer } from '../../types';

type  ListCardProps = {
  offer: Offer;
}

export function ListCard({ offer }: ListCardProps): JSX.Element {
  const {_id, title, date, image, price} = offer;

  return (
    <li className="catalog-item">
    <div className="catalog-item__data"><Link to={`/offer/${_id}`}><img src={image} srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" /></Link>
      <div className="catalog-item__data-wrapper">
        <Link to={`/offer/${_id}`} className="link"><p className="catalog-item__data-title">{title}</p></Link>
        <br />
        <p className="catalog-item__data-date">Дата добавления {date.toLocaleString()}</p>
        <p className="catalog-item__data-price">{price}</p>
      </div>
    </div>
    <div className="catalog-item__buttons"><a className="button button--small button--black-border" href="edit-item.html" aria-label="Редактировать товар">Редактировать</a>
      <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
    </div>
    </li>
  );
}
