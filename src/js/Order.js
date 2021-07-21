import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import OrderItem from './OrderItem';
import { getData } from './Utils';

export default function Order(props) {
  const [orderItems, setOrderItems] = useState()  
  function viewOrder(id) {
    const selectedItem = orderItems.find(item=>item._id === id)
    props.setSelOrderItem(selectedItem)
    props.setPage("orderdetail")
  }
  useEffect(() => {
    const query = (props.user.type == "owner") ? `res_id:{_id:"${props.selRestaurant._id}"}` : `user_id:{_id:"${props.user._id}"}`
    getData(`query {
      orders (query:{${query}}){
        _id
        res_id{
          name
        }
        user_id{
          firstname
          lastname      
        }
        meals{
          name
          desc
          price
          qty
        }
        history{
          _id
          date
          time
          status
        }
        date
        status
      }
    }`, (res)=>{
        setOrderItems(res.data.orders);
    })
  }, []);
  if(!orderItems) return(<Spinner animation="border" variant="primary" className="spinner" />)
  function getTitle() {
    return (props.user.type == "owner") ? "Orders of " + props.selRestaurant.name: "Your Orders."
  }
  const mealItems = orderItems.length ? orderItems.map(cartItem=> <OrderItem key={cartItem._id} item={cartItem} viewOrder={viewOrder} user={props.user} />): (<Alert className="w-100" variant='success' >You have no orders.</Alert>)
  return (
    <Container>
    <Row className="border-bottom mb-3">
      <Col xs={12} md={6}>
        <h3>{getTitle()}</h3>
      </Col>
    </Row>
    <Row>
        {mealItems}
    </Row>
    </Container>
  )
}