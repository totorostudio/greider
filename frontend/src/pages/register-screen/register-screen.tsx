import { Helmet} from 'react-helmet-async';
import { Header, Footer, Message } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import { AuthData } from '../../types';
import { userRegister } from '../../services';
import { MESSAGE_SHORT_TIMEOUT } from '../../const';

export function RegisterScreen(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nameError, setNameError] = useState<string>('Заполните поле');
  const [emailError, setEmailError] = useState<string>('Заполните поле');
  const [passError, setPassError] = useState<string>('Заполните поле');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const authData: AuthData = { name, email, password };
      await userRegister(authData);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/login');
      }, MESSAGE_SHORT_TIMEOUT);
    } catch (error) {
      console.error('Error in handleRegister:', error);
      setNameError('Ошибка. Пожалуйста, проверьте свои данные.');
      setEmailError('Ошибка. Пожалуйста, проверьте свои данные.');
      setPassError('Ошибка. Пожалуйста, проверьте свои данные.');
    }
  }

  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
    if (evt.target.value.trim() !== '') {
      setNameError('');
    } else {
      setNameError('Заполните поле');
    }
  };

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
    if (evt.target.value.trim() !== '') {
      setEmailError('');
    } else {
      setEmailError('Заполните поле');
    }
  };

  const handlePassChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
    if (evt.target.value.trim() !== '') {
      setPassError('');
    } else {
      setPassError('Заполните поле');
    }
  };

  return (
    <>
      <Helmet><title>Регистрация | Guitar Shop 2024</title></Helmet>
      <Header />
      {isSuccess ?
        <Message message='Вы успешно зарегистрированы!' />
      : (
        <>
          <main className="page-content">
            <div className="container">
              <section className="login">
                <h1 className="login__title">Регистрация</h1>
                <p className="login__text">Уже зарегистрированы? <Link to="/login" className="login__link">Войдите</Link> прямо сейчас</p>
                <form method="post" onSubmit={handleRegister} action="/">
                  <div className="input-login">
                    <label htmlFor="name">Введите имя</label>
                    <input type="text" onChange={handleNameChange} id="name" name="name" autoComplete="off" maxLength={15} required />
                    <p className="input-login__error">{nameError}</p>
                  </div>
                  <div className="input-login">
                    <label htmlFor="email">Введите e-mail</label>
                    <input type="email" onChange={handleEmailChange} id="email" name="email" autoComplete="off" required />
                    <p className="input-login__error">{emailError}</p>
                  </div>
                  <div className="input-login">
                    <label htmlFor="password">Придумайте пароль</label><span>
                      <input type="password" onChange={handlePassChange} placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off" minLength={6} maxLength={12} required />
                      <button className="input-login__button-eye" type="button">
                        <svg width="14" height="8" aria-hidden="true">
                          <use xlinkHref="#icon-eye"></use>
                        </svg>
                      </button></span>
                    <p className="input-login__error">{passError}</p>
                  </div>
                  <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
                </form>
              </section>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
