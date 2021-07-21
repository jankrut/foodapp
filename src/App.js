import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Login from './js/Login'
import SignUp from './js/SignUp'
import Meal from './js/Meal'
import Header from './js/Header'
import Footer from './js/Footer'
import RestaurantList from './js/RestaurantList'
import RestaurantMenu from './js/RestaurantMenu'
import Cart from './js/Cart'
import Order from './js/Order';

import './App.css';
import { getData, getToday, getTime } from './js/Utils';
import OrderDetail from './js/OrderDetail';
import UserList from './js/UserList';
import Restaurant from './js/Restaurant';

const Route = ([curPage, setPage, user, setUser]) => {
  const [selRestaurant, setSelRestaurant] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [selOrderItem, setSelOrderItem] = useState({});
  const [showCartAlert, setShowCartAlert] = useState(false);
  const addToCart = (meal)=>{
    const alreadyInCartIndex = cartItems.findIndex(item => item._id == meal._id)
    if(alreadyInCartIndex >= 0){
      if(meal.qty === 0){
        cartItems.splice(alreadyInCartIndex,1)
      }else{
        cartItems[alreadyInCartIndex].qty = meal.qty;
      }
      setCartItems([...cartItems]);
      // if(cartItems.length) setShowCartAlert(true)
      // else setShowCartAlert(false)
    }else{
      setCartItems(prevItems=> [...prevItems,meal]);
      // setShowCartAlert(true)
    }    
  }
  
  const placeOrder = () => {
    const cartItemData = cartItems.map(item=> `{name:"${item.name}",desc:"${item.desc}",price:"${item.price}",qty:"${item.qty}"}`)
    getData(`mutation { insertManyOrderItems(data: [${cartItemData}]) {insertedIds}}`, (data)=>{
      if(data.data.insertManyOrderItems.insertedIds){
        getData(`mutation {insertOneOrder(data:{
          user_id:{link:"${user._id}"},res_id:{link:"${selRestaurant._id}"},
          meals:{
            link:["${data.data.insertManyOrderItems.insertedIds.join('","')}"]
          },
          history:{
            create:[{date:"${getToday()}",time:"${getTime()}",status:"Placed"}]
          },
          date:"${getToday()}"
          status:"Placed"
        }) {
          _id
        }}`, (data)=>{
          if(data.data.insertOneOrder._id){
            setCartItems([])
            setPage("order")
          }
        })
      }
    })
  }
  const ShowOrders = () => {
    setPage("order")
  }
  function gotoCart() {
    setShowCartAlert(false)
    setPage("cart")
  }
  useEffect(()=>{
    console.log("cartItems",cartItems)
    if(cartItems.length && curPage != "cart"){
       setShowCartAlert(true)
      }
    else setShowCartAlert(false)
    if(curPage === "signin") setCartItems([])
  },[cartItems, curPage])
  
  return (
    <>
      {curPage === "signin" && <Login setUser={setUser} setPage={setPage} />}
      {curPage === "signup" && <SignUp setUser={setUser} setPage={setPage} />}
      {curPage === "meal" && <Meal user={user} setPage={setPage} selRestaurant={selRestaurant} />}
      {curPage === "restaurant" && <Restaurant user={user} setPage={setPage} setSelRestaurant={setSelRestaurant} />}
      {curPage === "restaurants" && <RestaurantList user={user} setPage={setPage} cartItems={cartItems} setCartItems={setCartItems} selRestaurant={selRestaurant} setSelRestaurant={setSelRestaurant} />}
      {curPage === "menu" && <RestaurantMenu selRestaurant={selRestaurant} cartItems={cartItems} setPage={setPage} addToCart={addToCart} />}
      {curPage === "cart" && <Cart setPage={setPage} cartItems={cartItems} setCartItems={setCartItems} placeOrder={placeOrder} />}
      {curPage === "order" && <Order setPage={setPage} user={user} setSelOrderItem={setSelOrderItem} selRestaurant={selRestaurant} />}
      {curPage === "orderdetail" && <OrderDetail setPage={setPage} user={user} selOrderItem={selOrderItem} />}
      {curPage === "users" && <UserList setPage={setPage} user={user} selRestaurant={selRestaurant} setSelRestaurant={setSelRestaurant}  />}
      {showCartAlert && <Alert variant="success" className="position-absolute cart-alert" >Added successfully, please <Alert.Link href="#" onClick={gotoCart} >View Cart</Alert.Link>.</Alert>}
    </>
  );
};

const App = () => {
  
  const [curPage, setPage] = useState("signin");
  const [user, setUser] = useState({});
  return (
  <Container className="p-3">
    <Header curPage={curPage} user={user} setPage={setPage} />
    <Container className="p-0 main-content">
      {Route([curPage, setPage, user, setUser])}
    </Container>
    <Footer />
  </Container>
  )
};

export default App;
