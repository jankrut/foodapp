import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { getData } from './Utils';

export default function RestaurantListItem(props) {
  const {restaurant} = props;
  function showMeal(evt) {
    props.showMeal(restaurant._id)
  }
  return (
    <Col xs={12} md={4}><div className="box">
  <span>{restaurant.name}</span>
    <p>{restaurant.desc ?? "default description"}</p>
    <div className="d-flex justify-content-end"><Button variant="outline-primary" className="float-right mx-1" onClick={showMeal}>View</Button></div>
  </div>
  </Col>
  )
}