import React, {useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';
import AuthContext from './Contexts'

const NavBar = ({handleSorting, history}) => {
  const { authState, authDispatch } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Задачник
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>  
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/new-task">+ Новая задача</Link>
          </li>
          <li className="nav-item dropdown">
            <button className="btn btn-secondary dropdown-toggle" href="#" id="navbarDropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Сортировка
            </button>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <button className="dropdown-item" href="#" onClick={() => handleSorting('username', 'asc')}>По имени ↓</button>
              <button className="dropdown-item" href="#" onClick={() => handleSorting('username', 'desc')}>По имени ↑</button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" href="#" onClick={() => handleSorting('email', 'asc')}>По email ↓</button>
              <button className="dropdown-item" href="#" onClick={() => handleSorting('email', 'desc')}>По email ↑</button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" href="#" onClick={() => handleSorting('status', 'asc')}>По статусу ↓</button>
              <button className="dropdown-item" href="#" onClick={() => handleSorting('status', 'desc')}>По статусу ↑</button>
            </div>
          </li>          
        </ul>
      </div>
      {
        !authState.isAuthenticated && 
        <button className="btn btn-dark" onClick={() => history.replace('/login')}>Войти</button>
      }
      {
        authState.isAuthenticated && 
        <div>
          <label className="mr-2 text-white">{authState.user}</label>
          <button className="btn btn-dark" onClick={() => authDispatch({ type: 'LOGOUT' })}>Выйти</button>
        </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);