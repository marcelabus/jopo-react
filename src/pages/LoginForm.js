import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import validateLogin from '../services/validateLogin.js';

import UserDataContext from '../context/UserDataContext.js';


import '../assets/css/LoginForm.css';

const LoginForm = () => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { userData, setUserData } = useContext(UserDataContext);

  const navigate = useNavigate();

  const editEmail = (newEmail) => {
    setUserEmail(newEmail);
    if (!newEmail || newEmail === '' || !(newEmail.includes('@'))) {
      setEmailError('Debe ingresar una dirección de correo válida');
      setTimeout(() => setEmailError(''), 1000 * 5);
    }
  }

  const editPassword = (newPassword) => {
    setUserPassword(newPassword);
    if (!newPassword || newPassword === '' || newPassword.length < 8) {
      setPasswordError('Debe ingresar una password válida');
      setTimeout(() => setPasswordError(''), 1000 * 5);
    }
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const userLoginData = {
      email: userEmail,
      password: userPassword
    }

    const result = await validateLogin(userLoginData);

    if (result.user) {
      // localStorage.setItem('user', JSON.stringify(result.user))
      setUserData(result.user);
      navigate('/');

    } else {
      setErrorMessage(result.meta.msg);
      setTimeout(() => setErrorMessage(''), 1000 * 5);
    }
  };

  return (
    < div id="login" >
      <div id="login-frame">

        <form id="login-form" onSubmit={handleLoginSubmit}>
          <input id="message" defaultValue={errorMessage} />

          <div className="form-data">
            <label>Email </label>
            <input type="email" name="email" id="email"
              placeholder="Ingrese un correo electrónico"
              onChange={({ target }) => { editEmail(target.value) }}
              value={userEmail} />
            <p className="email-error error">{emailError}</p>
          </div>

          <div className="form-data">
            <label>Contraseña </label>
            <input type="password" name="password" id="password"
              placeholder="Ingrese su password"
              onChange={({ target }) => { editPassword(target.value) }} 
              value={userPassword} />
            <p className="password-error error">{passwordError}</p>
          </div>

          <div id="remember-me" >
            <input type="checkbox" name="remember_user" />
            <label>Recordarme</label>
          </div>

          <div id="start-login">
            <button>INICIAR SESIÓN</button>
          </div>

        </form>

        <div id="register">
          <p>¿No tenés cuenta aún? <Link to="/registration">  Crear cuenta</Link></p>
        </div>

        <div>
          <Link to="#" id="forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div >
  )
}


export default LoginForm;