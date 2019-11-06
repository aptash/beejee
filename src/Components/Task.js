import React, {useState, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import AuthContext, {DevContext} from './Contexts'
import htmlDecode from '../utils/utils';

const Task = (props) => {
  const getDescription = (txt) => {
    const description = JSON.parse(htmlDecode(txt));
    return description.edited ? description.edited : description.original;
  };

  const {developer} = useContext(DevContext);
  const {authState, authDispatch} = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const [description, setDescription] = useState(getDescription(props.location.state.task.text));
  const [status, setStatus] = useState(props.location.state.task.status);

  const submit = async () => {
    setDisabled(true);

    const bodyFormData = new FormData();
    bodyFormData.set('status', status);
    const originalDescription = JSON.parse(htmlDecode(props.location.state.task.text)).original;
    const textJSON = description === originalDescription ? {original: originalDescription} : {original: originalDescription, edited: description};
    bodyFormData.set('text', JSON.stringify(textJSON));
    bodyFormData.set('token', authState.token);

    const editedTask = (await axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${props.location.state.task.id}?developer=${developer}`, bodyFormData, {
      headers: {'Content-Type': 'multipart/form-data' }
    })).data;

    if (editedTask.status === 'ok') {
      props.history.push({
        pathname: '/',
        state: { alertMsg: 'Задача была успешно отредактирована!', alertType: 'alert-success' }
      });
    } else {
      setDisabled(false);
      authDispatch({ type: 'LOGOUT' });
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card border-primary">
            <div className="card-header">Редактирование задачи</div>
            <div className="card-body text-left">
              <div className="form-group">
                <label>Имя пользователя:</label>
                <input
                  disabled={true}
                  type="text"
                  className="form-control"
                  value={props.location.state.task.username}
                />
              </div>
              <div className="form-group">
                <label>e-mail:</label>
                <input
                  disabled={true}
                  type="email"
                  className="form-control"
                  value={props.location.state.task.email}
                />
              </div>
              <div className="form-group">
                <label>Текст задачи:</label>
                <input
                  disabled={disabled}
                  type="text"
                  onChange={(e) => {setDescription(e.target.value)}}
                  className="form-control"
                  placeholder="Введите текст задачи"
                  value={description}
                />
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input type="checkbox" 
                    className="form-check-input"
                    checked={status === 10}
                    onChange={() => setStatus(status === 10 ? 0 : 10)}
                  />
                  <label className="form-check-label">Выполнено</label>
                </div>   
              </div>           
              <button
                disabled={disabled}
                className="btn btn-primary"
                onClick={submit}>
                {
                  disabled &&
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                }
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Task);