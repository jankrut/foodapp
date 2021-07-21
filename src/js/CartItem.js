import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import QtyStepper from './QtyStepper';

export default function CartItem(props){
  const {_id, name, price, desc, qty } = props.meal;
  const [quantity, setQty] = useState(qty)
  function qtyHandler(nqty) {
    setQty(parseInt(nqty))
    // props.meal.qty = parseInt(nqty);
    props.updateQty(_id,parseInt(nqty));
  }
return (
  <Container className="border-bottom m-2 pb-2">
  <Row>
    <Col xs={6}>
      <span><strong>{name}</strong></span>
      {/* <span>{desc}</span> */}
    </Col>
    <Col xs={6} className="d-flex align-items-center">
    <Col xs={6} className="text-right d-inline-block">
      <h6><strong>${price}<span className="text-muted">x</span></strong></h6>
    </Col>
    <Col xs={6} className="d-inline-block"><QtyStepper qty={qty} setQty={qtyHandler}/></Col>
    </Col>
  </Row>
  </Container>
)
}