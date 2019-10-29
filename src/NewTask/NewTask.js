import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

function NewQuestion(props) {
  const [disabled, setDisabled] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const submit = async () => {
    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    if (!userName || !email || !description) {
      alert('Необходимо заполнить все поля!');
      return;
    }

    if (!validateEmail(email)) {
      alert('email не валиден');
      return;
    }

    setDisabled(true);

    const bodyFormData = new FormData();
    bodyFormData.set('username', userName);
    bodyFormData.set('email', email);
    bodyFormData.set('text', description);

    const createdTask = (await axios.post('https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=ptash', bodyFormData, {
      headers: {'Content-Type': 'multipart/form-data' }
    })).data;

    if (createdTask.status === 'ok') {
      alert('Задача была успешно создана!');
      props.history.push('/');
    } else {
      alert('Задача не была создана!');
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
                <label htmlFor="exampleInputEmail1">e-mail:</label>
                <input
                  disabled={disabled}
                  type="email"
                  onBlur={(e) => {setEmail(e.target.value)}}
                  className="form-control"
                  placeholder="Введите e-mail"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Текст задачи:</label>
                <input
                  disabled={disabled}
                  type="text"
                  onBlur={(e) => {setDescription(e.target.value)}}
                  className="form-control"
                  placeholder="Введи текст задачи"
                />
              </div>
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

export default withRouter(NewQuestion);