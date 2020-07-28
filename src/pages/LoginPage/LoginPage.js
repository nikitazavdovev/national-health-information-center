import React, {useState} from "react";

import './LoginPage.css';
import logo from "../../assets/images/logo.svg";
import {connect} from "react-redux";
import {userLogin} from "../../store/actions";
import {userAuthenticate} from "../../utils/fakeApi";
import {useHistory} from "react-router-dom";
import {useAlert} from "react-alert";

const LoginPage = ({userLogin, isUserLoggedIn}) => {
  let history = useHistory();
  const alert = useAlert();

  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

  const onLogin = (e) => {
    e.preventDefault();
    userAuthenticate(formData).then(userData => {
      userLogin(userData)
    }).catch(() => {
      alert.show('No user with provided login/password', {
        type: 'error',
      })
    })
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  if(isUserLoggedIn) history.push('/');

  return (
    <main className='auth'>
      <div className='auth__block'>
        <img src={logo} alt="National Health Information Center" className='auth__logo'/>
        <h2 className='auth__title'>Health Terminology Solution</h2>
        <form action="#" className='auth__form' onSubmit={onLogin}>
          <label className='auth__input auth__login'>
            <span className='input__label'>Login</span>
            <input
              type="text"
              placeholder='Enter your login'
              className='input__field'
              name='login'
              onChange={handleInputChange}
              value={formData.login}
            />
          </label>
          <label className='auth__input auth__password'>
            <span className='input__label'>Password</span>
            <input
              type="password"
              placeholder='Enter your password'
              className='input__field'
              name='password'
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <label className='auth__remember'>
            <input type="checkbox"/>
            Remember me
          </label>
          <button className='auth__submit'>Login</button>
        </form>
      </div>
    </main>
  )
};

const mapDispatchToProps = {
  userLogin: userLogin
};
const mapStateToProps = state => {
  return {
    isUserLoggedIn: state.user.isLoggedIn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);