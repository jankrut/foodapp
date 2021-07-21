import React, {useState, useEffect} from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap';
import { getData } from './Utils';

export default function AddRestaurantPopup(props) {
  const {restaurant} = props;
  const [restaurantName, setRestaurantName] = useState(restaurant?.name ?? "")
  const [restaurantDesc, setRestaurantDesc] = useState(restaurant?.desc ?? "")
  const [process, setProcess] = useState(false);
  
  function addUpdateRestaurant(e) {
    e.preventDefault();
    setProcess(true)
    if(restaurant._id){
      getData(`mutation { updateOneRestaurant(query: {_id: "${restaurant._id}"}, set: {name:"${restaurantName}",desc:"${restaurantDesc}"}) { _id name desc}}`, (data)=>{
        if(data.data.updateOneRestaurant._id){
          props.updateRestaurant(data.data.updateOneRestaurant);
          props.onHide()
        }
      })
    }else{
      getData(`mutation { insertOneRestaurant(data: {name:"${restaurantName}",desc:"${restaurantDesc}",user_id:"${props.res_id}",status:"active", blocked:"[]"}) { _id name desc}}`, (data)=>{
        if(data.data.insertOneRestaurant._id){
          props.addRestaurant(data.data.insertOneRestaurant);
          props.onHide()
        }
      })
    }
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="addRestaurantModal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="addRestaurantModal">
          {restaurant._id ? "Edit Restaurant":"Add Restaurant"}
        </Modal.Title>
      </Modal.Header>
        <form onSubmit={addUpdateRestaurant}>
      <Modal.Body>
          <div className="form-group">
            <label htmlFor="restaurant-name" className="col-form-label">Name:</label>
            <input type="text" className="form-control" id="restaurant-name" name="restaurant" value={restaurantName} onInput={(evt)=>{setRestaurantName(evt.currentTarget.value)}} required/>
          </div>
          <div className="form-group">
            <label htmlFor="decription-text" className="col-form-label">Description:</label>
            <textarea className="form-control" id="decription-text" name="decription" value={restaurantDesc} onInput={(evt)=>{setRestaurantDesc(evt.currentTarget.value)}}required></textarea>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={props.onHide}>Cancel</Button>
        {process ? <Button variant="primary" disabled> <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/><span className="sr-only">Loading...</span> </Button> : <Button variant="primary" type="submit">{restaurant._id ? "Update":"Add"}</Button> }
      </Modal.Footer>
        </form>
    </Modal>
  );
}