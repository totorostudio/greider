import { Helmet } from 'react-helmet-async';
import { Header, Footer } from '../../components';
import { AuthContext } from '../../context';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthData } from '../../types';
import { userLogin, saveToken } from '../../services';
import { Link } from 'react-router-dom';

export function LoginScreen(): JSX.Element {
  const {setIsAuth} = useContext(AuthContext)!;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('Заполните поле');
  const [passError, setPassError] = useState<string>('Заполните поле');
  const [eye, setEye] = useState<string>('password');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const authData: AuthData = { email, password };
      const authResponse = await userLogin(authData);
      const token = authResponse.token;
      if (token) {
        saveToken(token);
        setIsAuth(true);
      }
    } catch (error) {
      console.error('Error in handleLogin:', error);
      setEmailError('Ошибка. Пожалуйста, проверьте свои данные.');
      setPassError('Ошибка. Пожалуйста, проверьте свои данные.');
    }
  }

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

  const eyeHandler = () => {
    if (eye === 'password') {
      setEye('text');
    } else {
      setEye('password');
    }
  }

  return (
    <>
      <Helmet><title>Вход на сайт | Guitar Shop 2024</title></Helmet>
      <Header />
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Войти</h1>
            <p className="login__text">Hовый пользователь? <Link to="/register" className="login__link">Зарегистрируйтесь</Link> прямо сейчас</p>
            <form onSubmit={handleLogin} method="post" action="/">
              <div className="input-login">
                <label htmlFor="email">Введите e-mail</label>
                <input type="email" onChange={handleEmailChange} id="email" name="email" autoComplete="off" required />
                <p className="input-login__error">{emailError}</p>
              </div>
              <div className="input-login">
                <label htmlFor="passwordLogin">Введите пароль</label><span>
                  <input type={eye === 'text' ? 'text' : 'password'} onChange={handlePassChange} placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password" autoComplete="off" minLength={6} maxLength={12} required />
                  <button onClick={eyeHandler} className="input-login__button-eye" type="button">
                    <svg width="14" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-eye"></use>
                    </svg>
                  </button></span>
                <p className="input-login__error">{passError}</p>
              </div>
              <button className="button login__button button--medium" type="submit">Войти</button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
