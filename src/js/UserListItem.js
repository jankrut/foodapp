import React, {useEffect, useState} from 'react';
import { Col, Button, Spinner } from 'react-bootstrap';

export default function UserListItem(props) {
  const {user} = props;
  const [process, setProcess] = useState(false)
  function toggleBlock(evt) {
    setProcess(true)
    props.toggleBlock(user._id)
  }
  useEffect(()=>{
    setProcess(false)
  },[props.blocked])
  return (
    <Col xs={12} md={4}>
      <div className="box">
        <span>{user.firstname+ " " + user.lastname}</span>
        <p>{user.email}</p>
        <div className="d-flex justify-content-end">
          {process ? <Button variant="outline-primary" disabled> <Spinner as="span" animation="border" size="sm" role="status"      aria-hidden="true"/><span className="sr-only">Loading...</span> </Button> : <Button variant="outline-primary" data-res-id={user._id} className="float-right mx-1" onClick={toggleBlock}>{props.blocked?"Unblock":"Block"}</Button> }
          </div>
      </div>
  </Col>
  )
}