import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import AuthContext, {DevContext} from './Contexts';
import {Link} from 'react-router-dom';
import htmlDecode from '../utils/utils';
import LoadingOverlay from 'react-loading-overlay';

const Tasks = (props) => {
  const {developer} = useContext(DevContext);
  const {authState} = useContext(AuthContext);
  const [tasks, setTasks] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOverlayActive, setOverlayActive] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      let sort = ''
      if (props.sortField && props.sortDirection) {
        sort = `&sort_field=${props.sortField}&sort_direction=${props.sortDirection}`;
      }
      setOverlayActive(true);
      const loadedTasks = (await axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=${developer}&page=${currentPage+1}${sort}`)).data;
      if (loadedTasks.status === 'ok') {
        setTasks(loadedTasks.message.tasks);  
        setPageCount(Math.ceil(Number(loadedTasks.message.total_task_count)/3));
      }
      setOverlayActive(false);
    };
    loadTasks();
  }, [currentPage, props.sortField, props.sortDirection, developer]);

  return (
    <LoadingOverlay
    active={isOverlayActive}
    spinner
    text='Загрузка данных...'
    styles={{
      wrapper: {
        width: '100%',
        height: '100%',
      }
    }}    
    >      
      <div className="container">
      <div className="row justify-content-center">
        {
          tasks && tasks.map(task => {
            const description = JSON.parse(htmlDecode(task.text));
            return (
            <div key={task.id} className="col-sm-12 col-md-4 col-lg-3">
              <div className="card text-white bg-success mb-3">
                <div className="card-header">{task.username}<br/>{task.email}</div>
                <div className="card-body">
                  <h4 className="card-title">{description.edited ? description.edited : description.original}</h4>
                  {
                    task.status === 10 &&
                    <>
                      <span className="badge badge-primary">Выполнено</span><br/>
                    </>
                  }
                  {
                    description.edited &&
                    <span className="badge badge-warning">Отредактировано</span>
                  }
                </div>
                {
                  authState.isAuthenticated &&
                  <Link 
                    to={{ pathname: `/task/${task.id}`, state: { task: task } }}
                    className="badge badge-secondary">Редактировать
                  </Link>
                }
              </div>
            </div>
          )})
        }
      </div>
      {
        pageCount > 1 &&
        <ReactPaginate
            previousLabel={'Предыдущая'}
            nextLabel={'Следующая'}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={(data) => {setCurrentPage(data.selected)}}
            containerClassName={'pagination justify-content-center'}
            subContainerClassName={'pages pagination'}
            pageLinkClassName={'page-link'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            previousClassName={'page-item'}
            nextClassName={'page-item'}
            breakClassName={'page-item disabled'}
            breakLabel={'...'}
          />
      }
    </div>
    </LoadingOverlay>
  )
}

export default Tasks;