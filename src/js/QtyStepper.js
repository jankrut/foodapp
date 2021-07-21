import React, { useEffect, useState } from 'react';
import { Form, Button, Col, Image } from 'react-bootstrap';
import trashIcon from '../images/trashIcon.svg';
import plusIcon from '../images/plus.svg';
import minusIcon from '../images/dash.svg';

export default function QtyStepper(props) {
  const [qty, setQty] = useState(0);
  function increaseQty(evt){
    setQty(qty+1)
    props.setQty(qty+1)
  }
  function decreaseQty(evt){
    if(qty>0) setQty(qty-1)
    props.setQty(qty-1)
  }
  useEffect(()=>{
    setQty(props.qty)
  },[])
  return (
    
    <Form.Row className="w-auto float-right">
      <Col>
        <Button variant="primary" onClick={decreaseQty} >{qty === 1 ? (<Image src={trashIcon} />) : (<Image src={minusIcon} />)}</Button>
      </Col>
      <Col>
      <Form.Label className="mb-0 p-2">{qty}</Form.Label>
      </Col>
      <Col>
      <Button variant="primary" onClick={increaseQty}><Image src={plusIcon} /></Button>
      </Col>
    </Form.Row>
  
  )
}