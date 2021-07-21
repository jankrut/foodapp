import React, {useState, useEffect} from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap';
import { getData } from './Utils';

export default function AddMealPopup(props) {
  const {meal} = props;
  const [mealName, setMealName] = useState("")
  const [mealDesc, setMealDesc] = useState("")
  const [mealPrice, setMealPrice] = useState("")
  const [process, setProcess] = useState(false);
  
  function addUpdateMeal(e) {
    e.preventDefault();
    setProcess(true)
    if(meal._id){
      getData(`mutation { updateOneMeal(query: {_id: "${meal._id}"}, set: {name:"${mealName}",desc:"${mealDesc}",price:"${mealPrice}"}) { _id name desc price res_id}}`, (data)=>{
        if(data.data.updateOneMeal._id){
          props.updateMeal(data.data.updateOneMeal);
          props.onHide()
        }
      })
    }else{
      getData(`mutation { insertOneMeal(data: {name:"${mealName}",desc:"${mealDesc}",price:"${mealPrice}",res_id:"${props.res_id}"}) { _id name desc price}}`, (data)=>{
        if(data.data.insertOneMeal._id){
          props.addMeal(data.data.insertOneMeal);
          props.onHide()
        }
      })
    }
  }
  useEffect(() => {
      setMealName(meal?.name ?? "");
      setMealDesc(meal?.desc ?? "");
      setMealPrice(meal?.price ?? "");
  }, []);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="addMealModal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="addMealModal">
          {meal._id ? "Edit Meal":"Add Meal"}
        </Modal.Title>
      </Modal.Header>
        <form onSubmit={addUpdateMeal}>
      <Modal.Body>
          <div className="form-group">
            <label htmlFor="meal-name" className="col-form-label">Name:</label>
            <input type="text" className="form-control" id="meal-name" name="meal" value={mealName} onInput={(evt)=>{setMealName(evt.currentTarget.value)}} required/>
          </div>
          <div className="form-group">
            <label htmlFor="decription-text" className="col-form-label">Description:</label>
            <textarea className="form-control" id="decription-text" name="decription" value={mealDesc} onInput={(evt)=>{setMealDesc(evt.currentTarget.value)}}required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price-text" className="col-form-label">Price: $</label>
            <input type="text" className="form-control" id="price-text" name="price" value={mealPrice} onInput={(evt)=>{setMealPrice(evt.currentTarget.value)}} required />
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={props.onHide}>Cancel</Button>
        {process ? <Button variant="primary" disabled> <Spinner as="span" animation="border" size="sm" role="status"      aria-hidden="true"/><span className="sr-only">Loading...</span> </Button> : <Button variant="primary" type="submit">{meal._id ? "Update":"Add"}</Button> }
      </Modal.Footer>
        </form>
    </Modal>
  );
}