import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import CartItem from './CartItem';

export default function Cart(props) {
  const [cartItems, setCartItems] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [process, setProcess] = useState(false)
  function gotoRestaurants() {
    props.setPage("restaurants")
  }

  function placeOrder() {
    setProcess(true)
    props.placeOrder();
  }
  

  useEffect(() => {
    setCartItems(props.cartItems);
  }, []);
  useEffect(() => {
    updateCart()
  }, [cartItems]);

  function updateQty(_id,qty) {
    if(qty === 0) {
      const newItems = cartItems.filter(item=>item._id !== _id)
      setCartItems([...newItems])
      props.setCartItems([...newItems])

    }else{
      const item = cartItems.find(item=>item._id == _id)
      console.log(item)
      item.qty = qty;
      updateCart();
    }
  }
  function updateCart() {
    const totalPrice = cartItems.reduce((total,cartItem) => total + cartItem.qty*cartItem.price,0)
    setCartTotal(totalPrice)
  }
  const mealItems = (cartItems.length) ? cartItems.map(cartItem=> <CartItem key={cartItem._id} meal={cartItem} updateQty={updateQty} />) : <Alert className="w-100" variant='success' >There are no items in your Cart. Please go <Alert.Link href="#" onClick={gotoRestaurants}>back to restaurants</Alert.Link>.</Alert>
  return (
    <Container>
    <Row className="border-bottom mb-3">
      <Col xs={12} md={6}>
        <h3>Your Cart.</h3>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12}>
        {mealItems}
      </Col>
    </Row>
    {cartItems.length > 0 && <Row className="text-center mt-2">
        <Col xs={9}>
          <h5 className="text-right">Total <strong>${cartTotal}</strong></h5>
        </Col>
        <Col xs={3}>
        {process ? <Button variant="primary" block disabled> <Spinner as="span" animation="border" role="status" size="sm"     aria-hidden="true"/><span className="sr-only">Loading...</span> </Button> : <Button variant="primary" block onClick={placeOrder}> Place Order </Button> } 
          
        </Col>
    </Row>}
    </Container>
  )
}