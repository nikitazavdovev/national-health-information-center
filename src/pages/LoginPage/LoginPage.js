import React from "react";

import './LoginPage.css';
import logo from "../../assets/images/logo.svg";

const LoginPage = () => {
  return (
    <main className='login'>
      <div className='login__block'>
        <img src={logo} alt="National Health Information Center" className='login__logo'/>
        <form action="#" className='login__form'>
          <label className='login__input login__email'>
            <span className='input__label'>E-mail</span>
            <input type="text" placeholder='Enter your e-mail' className='input__field'/>
          </label>
          <label className='login__input login__password'>
            <span className='input__label'>Password</span>
            <input type="password" placeholder='Enter your password' className='input__field'/>
          </label>
          <label className='login__remember'>
            <input type="checkbox"/>
            Remember me
          </label>
          <button className='login__submit'>Login</button>
        </form>
      </div>
    </main>
  )
};

export default LoginPage;