import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Header(props) {  
  const bgStyle={
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
  return (
    <Row className="mt-3">
      <Col>
      <div className="text-center p-4" style={bgStyle}>
        © 2021 Copyright:&nbsp;
        <a className="text-reset fw-bold" href="#">FoodApp.com</a>
      </div>
      </Col>
    </Row>
  )
}