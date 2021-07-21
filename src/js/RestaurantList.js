import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import RestaurantListItem from './RestaurantListItem';
import { getData } from './Utils';
import ConfirmPopup from './ConfirmPopup';

export default function RestaurantList(props) {
  const [restaurants, setRestaurants] = useState([])
  const [showConfirm, setShowConfirm] = useState(false);
  const [newRestaurantId, setNewRestaurantId] = useState();
  function showMeal(resId){
    if(props.cartItems.length && resId != props.selRestaurant._id){
      setNewRestaurantId(resId);
      setShowConfirm(true)
    }else{
      gotoMeal(resId);
    }
  }

  function confirmRemove(){
    props.setCartItems([])
    gotoMeal(newRestaurantId);
  }
  function gotoMeal(resId){
    const selectedRestaurant = restaurants.find(restaurant=> restaurant._id === resId);
    console.log("selectedRestaurant", selectedRestaurant)
    props.setSelRestaurant(selectedRestaurant)
    props.setPage("menu")
  }
  
  const restaurantLists = restaurants.map(restaurant=><RestaurantListItem key={restaurant._id} restaurant={restaurant} showMeal={showMeal} />)

  useEffect(() => {
    getData(`query { restaurants(query:{status:"active"}){_id name desc blocked}}`, (data)=>{
      if(data.data.restaurants.length){
        const filteredRes = data.data.restaurants.filter(restaurant => !restaurant.blocked.includes(props.user._id))
        setRestaurants(filteredRes);
      }
    })
  }, []);
  if(!restaurants.length) return(<Spinner animation="border" variant="primary" className="spinner" />)
  return (
    <Container>
    <Row className="border-bottom mb-3">
      <Col xs={12} md={6}>
        <h3>Choose Your Favourite Restaurant</h3>
      </Col>
    </Row>
    <Row>
        {restaurantLists}
    </Row>
    {showConfirm && <ConfirmPopup 
            show={true}
            msg="selecting other restaurant will delete items from your cart, continue?"
            primaryLbl="Yes"
            primarycb={confirmRemove}
            onHide={() => setShowConfirm(false)}
            />}
    </Container>
  )
}