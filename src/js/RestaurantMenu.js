import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import QtyStepper from './QtyStepper';
import { getData } from './Utils';

export default function RestaurantMenu(props) {
  const [meals, setMeals] = useState()

  function addMeal(mealId, qty){
    const meal = meals.find(meal=> meal._id == mealId);
    const mealToAdd = {...meal}
    mealToAdd.qty = qty;
    props.addToCart(mealToAdd)
  }

  function gotoRestaurants() {
    props.setPage("restaurants")
  }

  
  useEffect(() => {
    getData(`query { meals(query:{res_id:"${props.selRestaurant._id}"}){_id name desc price}}`, (data)=>{
        setMeals(data.data.meals);
    })
  }, []);
  if(!meals) return(<Spinner animation="border" variant="primary" className="spinner" />)
  const mealItems = meals.length ? meals.map(meal=>{
    let qty = 0;
    if(props.cartItems.length){
      const mealInCart = props.cartItems.find(item=>item._id == meal._id)
      if(mealInCart) qty = mealInCart.qty;
    }
     return <MealItem key={meal._id} meal={meal} qty={qty} addMeal={addMeal} />}) : (<Alert className="w-100" variant='success' >Sorry, no meals found for this restaurant. Please go <Alert.Link href="#" onClick={gotoRestaurants}>back to restaurants</Alert.Link>.</Alert>)
  
  return (
    <Container>
    <Row className="border-bottom mb-3">
      <Col xs={12} md={6}>
        <h3>Add meal to the cart.</h3>
      </Col>
    </Row>
    <Row>
        {mealItems}
    </Row>
    </Container>
  )
}

function MealItem(props){
  const [qty, setQty] = useState(props.qty)
  const {_id, name, price, desc } = props.meal;
  function updateQty(params) {
    setQty(parseInt(qty)+1)
    props.addMeal(_id, parseInt(qty)+1);
  }
  function qtyHandler(quantity) {
    setQty(parseInt(quantity))
    props.addMeal(_id, parseInt(quantity));
  }
  
return (
  <Col xs={12} md={4}><div className="box">
  <span>{name}</span><span className="float-right price">${price}</span>
  <p>{desc ?? "default description"}</p>
  <div className="d-flex justify-content-end">
    {qty === 0 && <Button variant="outline-primary" className="float-right mx-1" onClick={updateQty}>Add</Button>}
    {qty !== 0 && <QtyStepper qty={qty} setQty={qtyHandler}/>}
    </div>
  </div>
  </Col>
)
}