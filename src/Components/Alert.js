import React from 'react';
import {withRouter} from 'react-router-dom';

const Alert = ({message, type, history}) => {
  const handleClose = () => {
    history.push('/');    
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-md-4 col-lg-3">
        <div className={`alert ${type} alert-dismissible fade show`} role="alert">
          {message}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div> 
      </div>
    </div>
  );
}

export default withRouter(Alert);