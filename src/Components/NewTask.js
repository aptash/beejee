import React, {useState, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {DevContext} from './Contexts'

const NewTask = (props) => {
  const {developer} = useContext(DevContext);
  const [disabled, setDisabled] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [alertState, setAlert] = useState('');

  const submit = async () => {
    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    if (!userName || !email || !description) {
      setAlert('Необходимо заполнить все поля!');
      return;
    }

    if (!validateEmail(email)) {
      setAlert('email не валиден');
      return;
    }

    setDisabled(true);

    const bodyFormData = new FormData();
    bodyFormData.set('username', userName);
    bodyFormData.set('email', email);
    bodyFormData.set('text', JSON.stringify({original: description}));

    const createdTask = (await axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=${developer}`, bodyFormData, {
      headers: {'Content-Type': 'multipart/form-data' }
    })).data;

    if (createdTask.status === 'ok') {
      props.history.push({
        pathname: '/',
        state: { alertMsg: 'Задача была успешно создана!', alertType: 'alert-success' }
      });
    } else {
      setAlert('Задача не была создана!');
      setDisabled(false);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card border-primary">
            <div className="card-header">Новая Задача</div>
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
                <label>e-mail:</label>
                <input
                  disabled={disabled}
                  type="email"
                  onBlur={(e) => {setEmail(e.target.value)}}
                  className="form-control"
                  placeholder="Введите e-mail"
                />
              </div>
              <div className="form-group">
                <label>Текст задачи:</label>
                <input
                  disabled={disabled}
                  type="text"
                  onBlur={(e) => {setDescription(e.target.value)}}
                  className="form-control"
                  placeholder="Введите текст задачи"
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
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(NewTask);