import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getData } from './Utils';
import MealItem from './MealItem';
import AddMealPopup from './AddMealPopup';

export default function Meal(props) {
  const [meals, setMeals] = useState()
  const [showAdd, setShowAdd] = useState(false);
  const [curMeal, setCurMeal] = useState(null)
  const [process, setProcess] = useState(false)
  function addMeal(meal){
    setMeals([...meals,meal])
  }
  function newMeal(){
    setCurMeal({});
  }
  function updateMeal(meal){
    const updatedMeals = [...meals]
    const ind = updatedMeals.findIndex(mealobj => mealobj._id === meal._id)
    updatedMeals[ind] = {...meal}
    setMeals(updatedMeals);
  }
  function hideMealPopup() {
    setShowAdd(false)
    setCurMeal(null);
  }
  function editMeal(id){
    const meal = meals.find(meal=>meal._id == id)
    setCurMeal(meal);
  }
  function deleteMeal(id){
    setProcess(true)
    getData(`mutation { deleteOneMeal(query: {_id: "${id}"}) { _id}}`, (data)=>{
      if(data.data.deleteOneMeal._id){
        setMeals(meals.filter(meal => meal._id !== id));
      }
      setProcess(false)
    })
  }
  
  useEffect(() => {
    if(curMeal) setShowAdd(true)
  }, [curMeal]);
  
  useEffect(() => {
    getData(`query { meals(query:{res_id:"${props.selRestaurant._id}"}){_id name desc price}}`, (res)=>{
      if(res.data.meals){
        setMeals(res.data.meals);
      }
    })
  }, []);
  if(!meals) return(<Spinner animation="border" variant="primary" className="spinner" />)
  const mealItems = (meals.length) ? meals.map(meal=><MealItem key={meal._id} meal={meal} editMeal={editMeal} deleteMeal={deleteMeal} />) : (<Alert className="w-100" variant='success' >You have no meals. Please add to manage.</Alert>)
  return (
    <Container>
    <Row className="border-bottom mb-3">
      <Col xs={12} md={6}>
        <h3>{props.selRestaurant.name} - Meals</h3>
      </Col>
      <Col xs={12} md={6}>
        <button type="button" className="btn btn-primary float-right mb-2" onClick={newMeal}>Add New Meal</button>
    {showAdd && <AddMealPopup
        show={true}
        meal={curMeal}
        onHide={hideMealPopup}
        addMeal={addMeal}
        updateMeal={updateMeal}
        res_id={props.selRestaurant._id}
      />}
      </Col>
    </Row>
    <Row>
        {mealItems}
    </Row>
    {process && <Spinner animation="border" variant="primary" className="spinner" />}
    </Container>
  )
}