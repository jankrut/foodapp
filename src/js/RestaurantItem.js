import React, {useState} from 'react'
import { Col, Button, Image } from 'react-bootstrap';
import ConfirmPopup from './ConfirmPopup';
import trashIcon from '../images/trashIcon.svg';
import editIcon from '../images/pencil.svg';

export default function RestaurantItem(props) {
    const {restaurant} = props;
    const [showConfirm, setShowConfirm] = useState(false);
    function editRestaurant(evt) {
        props.editRestaurant(restaurant._id)
    }
    function deleteRestaurant(evt) {
        props.deleteRestaurant(restaurant._id)
    }
    function showConfirmPopup(evt){
        setShowConfirm(true)
    }
    function gotoMeals(evt){
        props.showMeals(restaurant._id)
    }
    function gotoOrders(evt){
        props.showOrders(restaurant._id)
    }
    function gotousers(evt){
        props.showUsers(restaurant._id)
    }
    return (
        <Col key={restaurant._id} xs={12} md={4}>
            <div className="box">
                <div className="d-flex justify-content-end">
                    <Button variant="primary" size="sm" className="mx-1" onClick={editRestaurant}><Image src={editIcon} /></Button>
                    <Button variant="primary" size="sm" className="mx-1" onClick={showConfirmPopup}><Image src={trashIcon} /></Button>
                </div>
                <span><strong>{restaurant.name}</strong></span>
                <p>{restaurant.desc ?? "default description"}</p>
                <div className="d-flex justify-content-end">
                    <Button variant="outline-primary" className="float-right mx-1" onClick={gotoOrders}>Orders</Button>
                    <Button variant="outline-primary" className="float-right mx-1" onClick={gotoMeals}>Meals</Button>
                    <Button variant="outline-primary" className="float-right mx-1" onClick={gotousers}>Users</Button>
                </div>
            </div>
            {showConfirm && <ConfirmPopup 
            show={true}
            msg="you want to delete this restaurant?"
            primarycb={deleteRestaurant}
            onHide={() => setShowConfirm(false)}
            />}
        </Col>
    )
}