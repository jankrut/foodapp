import React, {useState} from 'react'
import { Col, Button } from 'react-bootstrap';
import ConfirmPopup from './ConfirmPopup';

export default function MealItem(props) {
    const {meal} = props;
    const [showConfirm, setShowConfirm] = useState(false);
    function editMeal(evt) {
        props.editMeal(meal._id)
    }
    function deleteMeal(evt) {
        props.deleteMeal(meal._id)
    }
    function showConfirmPopup(evt){
        setShowConfirm(true)
    }
    return (
        <Col key={meal._id} xs={12} md={4}><div className="box">
            <span><strong>{meal.name}</strong></span><span className="float-right price">${meal.price}</span>
            <p>{meal.desc ?? "default description"}</p>
            <div className="d-flex justify-content-end">
                <Button variant="outline-primary" className="float-right mx-1" onClick={editMeal}>Edit</Button>
                <Button variant="outline-primary" className="float-right mx-1" onClick={showConfirmPopup}>Delete</Button>
                </div>
            </div>
            {showConfirm && <ConfirmPopup 
            show={true}
            msg="you want to delete this meal?"
            primarycb={deleteMeal}
            onHide={() => setShowConfirm(false)}
            />}
        </Col>
    )
}