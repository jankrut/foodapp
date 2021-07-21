import React from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function ConfirmPopup(props){
    function OkHandler(evt) {
        if(props.primarycb) props.primarycb();
        props.onHide();
    }
    function CancelHandler(evt) {
        if(props.secondaryLbl) props.secondaryLbl();
        props.onHide();
    }
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="confirmModal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="confirmModal">
            Are you sure?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.msg ?? "asdfsd"}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={CancelHandler}>{props.secondaryLbl ?? "No"}</Button>
          <Button variant="primary" onClick={OkHandler}>{props.primaryLbl ?? "Yes"}</Button>
        </Modal.Footer>
      </Modal>
    )
  }