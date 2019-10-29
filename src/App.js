import React, {useState} from 'react';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
// import Task from './Task/Task';
import Tasks from './Tasks/Tasks';
import NewTask from './NewTask/NewTask';
import Login from './Login/Login';

function App(props) {
  const [sortField, setSortField] = useState();
  const [sortDirection, setSortDirection] = useState();

  const handleSorting = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  }

  return (
    <div>
      <NavBar handleSorting={handleSorting}/>
      <Route exact path='/' render={() => <Tasks sortField={sortField} sortDirection={sortDirection} />}/>
      <Route path='/new-task' component={NewTask} />
      <Route exact path='/login' component={Login}/>
    </div>
  );
}

export default withRouter(App);