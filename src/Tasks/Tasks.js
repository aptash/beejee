import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Tasks(props) {
  const [tasks, setTasks] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const loadTasks = async () => {
      let sort = ''
      if (props.sortField && props.sortDirection) {
        sort = `&sort_field=${props.sortField}&sort_direction=${props.sortDirection}`;
      }
      const loadedTasks = (await axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=ptash&page=${currentPage+1}${sort}`)).data;
      if (loadedTasks.status === 'ok') {
        setTasks(loadedTasks.message.tasks);  
        setPageCount(Math.ceil(Number(loadedTasks.message.total_task_count)/3));
      }
    };
    loadTasks();
  }, [currentPage, props.sortField, props.sortDirection]);

  return (
    <div className="container">
      <div className="row">
        {tasks === null && <p>Загрузка задач...</p>}
        {
          tasks && tasks.map(task => (
            <div key={task.id} className="col-sm-12 col-md-4 col-lg-3">
              <div className="card text-white bg-success mb-3">
                <div className="card-header">{task.username} {task.email}</div>
                <div className="card-body">
                  <h4 className="card-title">{task.text}</h4>
                  <p className="card-text">{task.status}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
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
    </div>
  )
}

export default Tasks;