import React, { Component } from 'react';
import { Row, Col,Image, Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import LogoImg from '../images/final-logo-example.png'
export default function Header(props) {

  function gotoManageRestaurant() {
    props.setPage("restaurant")
  }
  function gotoRestaurants() {
    props.setPage("restaurants")
  }
  function gotoOrders() {
    props.setPage("order")
  }
  function gotoUsers() {
    props.setPage("users")
  }
  function gotoLogin() {
    props.setPage("signin")
  }
    
  return (
    <Row>
      <Col sm={4}>
      <Image src={LogoImg} fluid alt="logo" />
      </Col>
      <Col sm={8}>
         {/* {( props.curPage !== "signin" && props.curPage !== "signup") ? <div className="float-right"><span className="mr-2" >Welcome, User Name</span><button type="button" className="btn btn-outline-primary">Sign Out</button></div> : ""} */}
         {(props.curPage !== "signin" && props.curPage !== "signup") && <Navbar variant="primary" bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {props.user.type === "owner" && <Nav.Link  href="#" onClick={gotoManageRestaurant}>Restaurants</Nav.Link>}
            {/* {props.user.type === "owner" && <Nav.Link href="#" onClick={gotoUsers}>Users</Nav.Link>} */}
            {props.user.type === "regular" && <Nav.Link href="#" onClick={gotoRestaurants}>Restaurants</Nav.Link>}
            {props.user.type === "regular" && <Nav.Link href="#" onClick={gotoOrders}>Orders</Nav.Link>}
            <Nav.Link href="#" onClick={gotoLogin}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
          <Navbar.Text>
            Welcome, {props.user.firstname+" "+props.user.lastname}
          </Navbar.Text>
      </Navbar>}
      </Col>
    </Row>
  )
}