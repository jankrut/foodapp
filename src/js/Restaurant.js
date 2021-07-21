import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getData } from './Utils';
import RestaurantItem from './RestaurantItem';
import AddRestaurantPopup from './AddRestaurantPopup';

export default function Restaurant(props) {
  const [restaurants, setRestaurants] = useState()
  const [showAdd, setShowAdd] = useState(false);
  const [curRestaurant, setCurRestaurant] = useState(null)
  const [process, setProcess] = useState(false)
  function addRestaurant(restaurant){
    setRestaurants([...restaurants,restaurant])
  }
  function newRestaurant(){
    setCurRestaurant({});
  }
  function updateRestaurant(restaurant){
    const updatedRestaurants = [...restaurants]
    const ind = updatedRestaurants.findIndex(restaurantobj => restaurantobj._id === restaurant._id)
    updatedRestaurants[ind] = {...restaurant}
    setRestaurants(updatedRestaurants);
  }
  function hideRestaurantPopup() {
    setShowAdd(false)
    setCurRestaurant(null);
  }
  function showMeals(resId){
    const selectedRestaurant = restaurants.find(restaurant=> restaurant._id === resId);
    console.log("selectedRestaurant", selectedRestaurant)
    props.setSelRestaurant(selectedRestaurant)
    props.setPage("meal")
  }
  function showUsers(resId){
    const selectedRestaurant = restaurants.find(restaurant=> restaurant._id === resId);
    console.log("selectedRestaurant", selectedRestaurant)
    props.setSelRestaurant(selectedRestaurant)
    props.setPage("users")
  }
  function showOrders(resId){
    const selectedRestaurant = restaurants.find(restaurant=> restaurant._id === resId);
    console.log("selectedRestaurant", selectedRestaurant)
    props.setSelRestaurant(selectedRestaurant)
    props.setPage("order")
  }
  function editRestaurant(id){
    const meal = restaurants.find(meal=>meal._id == id)
    setCurRestaurant(meal);
  }
  function deleteRestaurant(id){
    setProcess(true)
    getData(`mutation { updateOneRestaurant(query: {_id: "${id}"}, set: {status:"inactive"}) { _id}}`, (data)=>{
      if(data.data.updateOneRestaurant._id){
        setRestaurants(restaurants.filter(meal => meal._id !== id));
      }
      setProcess(false)
    })
  }
  
  useEffect(() => {
    if(curRestaurant) setShowAdd(true)
  }, [curRestaurant]);
  
  useEffect(() => {
    getData(`query { restaurants(query:{user_id:"${props.user._id}", status:"active"}){_id name desc blocked}}`, (res)=>{
      if(res.data.restaurants){
        setRestaurants(res.data.restaurants);
      }
    })
  }, []);
  if(!restaurants) return(<Spinner animation="border" variant="primary" className="spinner" />)
  const restaurantItems = (restaurants.length) ? restaurants.map(restaurant=><RestaurantItem key={restaurant._id} restaurant={restaurant} editRestaurant={editRestaurant} deleteRestaurant={deleteRestaurant} showMeals={showMeals} showUsers={showUsers} showOrders={showOrders} />) : (<Alert className="w-100" variant='success' >You have no meals. Please add to manage.</Alert>)
  return (
    <Container>
    <Row className="border-bottom mb-3">
      <Col xs={12} md={6}>
        <h3>Manage Your Restaurants</h3>
      </Col>
      <Col xs={12} md={6}>
        <button type="button" className="btn btn-primary float-right mb-2" onClick={newRestaurant}>Add New Restaurant</button>
    {showAdd && <AddRestaurantPopup
        show={true}
        restaurant={curRestaurant}
        onHide={hideRestaurantPopup}
        addRestaurant={addRestaurant}
        updateRestaurant={updateRestaurant}
        res_id={props.user._id}
      />}
      </Col>
    </Row>
    <Row>
        {restaurantItems}
    </Row>
    {process && <Spinner animation="border" variant="primary" className="spinner" />}
    </Container>
  )
}