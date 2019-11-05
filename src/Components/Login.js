import React, {useState, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import AuthContext, {DevContext} from './Contexts'

const Login = (props) => {
  const {authState, authDispatch} = useContext(AuthContext);
  const {developer} = useContext(DevContext);

  if (authState.isAuthenticated) {
    props.history.push('/');
  }

  const [disabled, setDisabled] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [alertState, setAlert] = useState('');

  const submit = async () => {
    if (!userName || !password) {
      setAlert('Все поля обязательны для заполнения!');
      return;
    }

    setDisabled(true);

    const bodyFormData = new FormData();
    bodyFormData.set('username', userName);
    bodyFormData.set('password', password);

    const login = (await axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=${developer}`, bodyFormData, {
      headers: {'Content-Type': 'multipart/form-data' }
    })).data;

    if (login.status === 'ok') {
      authDispatch({ type: 'LOGIN', user: userName, token: login.message.token });
      props.history.push('/');
    } else {
      setAlert('Неправильные реквизиты доступа!');
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
                <label>Имя пользователя:</label>
                <input
                  disabled={disabled}
                  type="text"
                  onBlur={(e) => {setUserName(e.target.value)}}
                  className="form-control"
                  placeholder="Введите имя пользователя"
                />
              </div>
              <div className="form-group">
                <label>Пароль:</label>
                <input
                  disabled={disabled}
                  type="password"
                  onBlur={(e) => {setPassword(e.target.value)}}
                  className="form-control"
                  placeholder="Введите пароль"
                />
              </div>
              {
                alertState &&
                <div className="alert alert-danger" role="alert">{alertState}</div>              
              }
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