import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Link, useRouteMatch } from 'react-router-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  let {path, url} = useRouteMatch()

  return <Link to={`${url}`}>
  <div className={classes.backdrop} onClick={props.onClose} />
  </Link>
};

const ModalOverlay = (props) => { //props is the data that will be displayed
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

export const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

