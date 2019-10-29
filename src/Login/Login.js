import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

function Login(props) {
  const [disabled, setDisabled] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (!userName || !password) {
      alert('Все поля обязательны для заполнения!');
      return;
    }

    setDisabled(true);

    const bodyFormData = new FormData();
    bodyFormData.set('username', userName);
    bodyFormData.set('password', password);

    const login = (await axios.post('https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=ptash', bodyFormData, {
      headers: {'Content-Type': 'multipart/form-data' }
    })).data;

    if (login.status === 'ok') {
      alert('Успешная авторизация!');
      const date = new Date();
      date.setTime(date.getTime()+(24*60*60*1000));  
      document.cookie = `token=${login.message.token};expires=${date.toGMTString()}`;
      props.history.push('/');
    } else {
      alert('Неправильные реквизиты доступа!');
      setDisabled(false);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card border-primary">
            <div className="card-header">Авторизация</div>
            <div className="card-body text-left">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Имя пользователя:</label>
                <input
                  disabled={disabled}
                  type="text"
                  onBlur={(e) => {setUserName(e.target.value)}}
                  className="form-control"
                  placeholder="Введите имя пользоватея"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Пароль:</label>
                <input
                  disabled={disabled}
                  type="password"
                  onBlur={(e) => {setPassword(e.target.value)}}
                  className="form-control"
                  placeholder="Введите пароль"
                />
              </div>
              <button
                disabled={disabled}
                className="btn btn-primary"
                onClick={submit}>
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Login);