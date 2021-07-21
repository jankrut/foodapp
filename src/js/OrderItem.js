import React, { useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';

export default function OrderItem(props){
  const {name } = props.item.res_id ?? "";
  const {firstname, lastname } = props.item.user_id ?? "";
  // const [quantity, setQty] = useState(qty)
  // function qtyHandler(nqty) {
  //   setQty(parseInt(nqty))
  //   props.meal.qty = parseInt(nqty);
  //   props.updateCart();
  // }
  function viewOrder(){
    props.viewOrder(props.item._id)
  }
  function getmealNames(){
    return props.item.meals.map(meal=>meal.name).join(",");
  }
  function getTitle(){
    return props.user.type === "owner" ? firstname+" "+lastname : name;
  }
  function getTotal() {
    return props.item.meals.reduce((total,cartItem) => total + cartItem.qty*cartItem.price,0)
  }
return (
  <Col key={props._id} xs={12} md={6}><div className="box">
    {/* <div>
  <h5 className="d-inline-block">Order#{props.item._id}</h5>
  </div> */}
    <div>
  <h5 className="d-inline-block">{getTitle()}</h5><span className="float-right">Status: {props.item.status}</span>
  </div>
  <div>
  <h5 className="d-inline-block">${getTotal()}</h5><span className="float-right">{props.item.date}</span>
  </div>
    <p>{getmealNames()}</p>
    <div className="d-flex justify-content-end"><Button variant="outline-primary" className="float-right mx-1" onClick={viewOrder}>View</Button></div>
  </div>
  </Col>
)
}