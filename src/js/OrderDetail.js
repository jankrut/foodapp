import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Spinner } from 'react-bootstrap';
import OrderDetailItem from './OrderDetailItem';
import { getData, getToday, getTime } from './Utils';

export default function OrderDetail(props) {
  // const [meals, setMeals] = useState([])
  const [cartTotal, setCartTotal] = useState(0);
  const [orderStatus, setOrderStatus] = useState();
  const [orderHistory, setOrderHistory] = useState([]);
  const [process, setProcess] = useState(false)
  const {_id, user_id, res_id, meals, status, date, history} = props.selOrderItem

  const mealItems = meals.map(mealItem=> <OrderDetailItem key={mealItem._id} meal={mealItem} />)

  useEffect(() => {
    updateCart()
    setOrderStatus(status);
    setOrderHistory(history);
  }, []);
  // useEffect(() => {
  //   updateCart()
  // }, [meals]);

  
  function updateCart() {
    const totalPrice = meals.reduce((total,cartItem) => total + cartItem.qty*cartItem.price,0)
    setCartTotal(totalPrice)
  }

  function getHistoryIds(params) {
    return orderHistory.map(item=>item._id)
  }

  function updateStatus(newStatus) {
    setProcess(true)
    getData(`mutation {insertOneOrderHistory(data:{date:"${getToday()}",time:"${getTime()}",status:"${newStatus}"}){_id}}`,(res)=>{
      if(res.data.insertOneOrderHistory._id){
        getData(`mutation {updateOneOrder(query: {_id: "${_id}"}, set:{
          history:{
            link:["${res.data.insertOneOrderHistory._id}","${getHistoryIds().join('","')}"]
          },
          status:"${newStatus}"
        }) {
          _id
          history{
            _id
            date
            time
            status
          }
        }}`, (data)=>{
          if(data.data.updateOneOrder._id){
            setOrderStatus(newStatus)
            setOrderHistory([...data.data.updateOneOrder.history])
          }
          setProcess(false)
        })
      }
    })
    
  }

  function StatusButton() {
    if(props.user.type === "regular"){
      return (
        (orderStatus === "Placed") ? <div className="float-right">Change to: {process ? <Button variant="outline-primary" disabled> <Spinner as="span" animation="border" size="sm" role="status"  aria-hidden="true"/><span className="sr-only">Loading...</span> </Button> : <Button variant="outline-primary" onClick={()=>{updateStatus("Canceled")}} >Cancel</Button>}</div> : ((orderStatus === "Delivered") ? <div className="float-right">Change to: {process ? <Button variant="outline-primary" disabled> <Spinner as="span" animation="border" size="sm" role="status"  aria-hidden="true"/><span className="sr-only">Loading...</span> </Button> : <Button variant="outline-primary" onClick={()=>{updateStatus("Received")}} >Received</Button>}</div>:"")
      )
    }else{
      return (
        (orderStatus === "Placed") ? <div className="float-right">Change to: {process ? <Button variant="outline-primary" disabled> <Spinner as="span" animation="border" size="sm" role="status"  aria-hidden="true"/><span className="sr-only">Loading...</span> </Button> : <Button variant="outline-primary" onClick={()=>{updateStatus("Processing")}} >Processing</Button>}</div> : ((orderStatus === "Processing") ? <div className="float-right">Change to: {process ? <Button variant="outline-primary" disabled> <Spinner as="span" animation="border" size="sm" role="status"  aria-hidden="true"/><span className="sr-only">Loading...</span> </Button> : <Button variant="outline-primary" onClick={()=>{updateStatus("In Route")}} >In Route</Button>}</div> : ((orderStatus === "In Route") ? <div className="float-right">Change to: {process ? <Button variant="outline-primary" disabled> <Spinner as="span" animation="border" size="sm" role="status"  aria-hidden="true"/><span className="sr-only">Loading...</span> </Button> : <Button variant="outline-primary" onClick={()=>{updateStatus("Delivered")}} >Delivered</Button>}</div>:""))
      )
    }    
  }

  function getTitle(){
    return props.user.type === "owner" ? user_id.firstname+" "+user_id.lastname : res_id.name;
  }
  function getHistory(){
    return orderHistory.map((item,ind) => <tr>
      <td>{ind+1}</td>
      <td>{item.date}</td>
      <td>{item.time}</td>
      <td>{item.status}</td>
    </tr>)
  }

  return (
    <Container>
    <Row className="border-bottom mb-3">
      <Col xs={12} md={6}>
        <h3>Order details</h3>
      </Col>
      <Col xs={12} md={6}>
        <StatusButton/>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={6}>
        <h4><strong>{getTitle()}</strong></h4>
      </Col>
      <Col xs={12} md={6} className="text-right">
        <span className="float-left" >{date}</span>Status:<strong>{orderStatus}</strong>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12}>
        {mealItems}
      </Col>
    </Row>
    <Row className="text-center mt-2">
        <Col xs={12}>
          <h5 className="text-right">Total <strong>${cartTotal}</strong></h5>
        </Col>
    </Row>
    <Row className="border-bottom mb-3">
      <Col xs={12} md={6}>
        <h3>Order history</h3>
      </Col>
      <Col xs={12}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {getHistory()}          
        </tbody>
      </Table>
      </Col>
    </Row>
    </Container>
  )
}