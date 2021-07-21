import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import QtyStepper from './QtyStepper';

export default function OrderDetailItem(props){
  const {_id, name, price, desc, qty } = props.meal;
return (
  <Container key={_id} className="border-bottom m-2 pb-2">
  <Row>
    <Col xs={6}>
      <span>{name}</span>
      {/* <span>{desc}</span> */}
    </Col>
    <Col xs={6} className="d-flex align-items-center">
    <Col xs={9} className="text-right d-inline-block">
      <h6>${price}<span className="text-muted">x</span></h6>
    </Col>
    <Col xs={3} className="d-inline-block text-right">{qty}</Col>
    </Col>
  </Row>
  </Container>
)
}