import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Row, Col,Image, Alert, Button, Spinner } from 'react-bootstrap';
import AccountImg from '../images/account.PNG'
import { getData } from './Utils';

let remember = false;

export default function Login(props) {
    const [Loginerror, setLoginerror] = useState("");
    const [process, setProcess] = useState(false);
    function gotoPage(pageName){
        props.setPage(pageName)
    }
    function gotoSignup(){
        gotoPage('signup')
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log("this",this);
        console.log("event",e.currentTarget);
        let frm = e.currentTarget;
        let email = frm.email.value;
        let pass = frm.password.value;
        // remember = frm.remember.checked;
        console.log("email",email);
        console.log("pass",pass);
        console.log("remember",remember);
        login(email,pass);
        setProcess(true)
    }
    function login(email, pass) {
        getData(`query {profiles (query:{email:"${email}", password:"${pass}"}, limit:1) {_id email firstname lastname type resname resdesc blocked} }`, loginresponse);
    }
    function loginresponse(data) {
        if(data.data.profiles.length){
        //   props.setIsLoggedIn(true);
          console.log("user", data.data.profiles);
          const user = data.data.profiles[0];
          props.setUser(user);
        //   if(remember){
        //     Cookies.set('user', user);
        //   }else{
        //     Cookies.set('user', user, { expires: 0.5 });
        //   }
          if(user.type === "owner"){
              gotoPage("restaurant");
            }else{
              gotoPage("restaurants");
          }
        }else{
            setProcess(false)
            props.setUser({});
            console.log("wrong username/password.")
            setLoginerror("wrong username/password !")
        }
    }
      
    let LoginMsg = () => {
        if(Loginerror !== ""){
            return <Alert variant='danger' onClose={() => {setLoginerror("")}} dismissible>{Loginerror}</Alert>
        }else{
            return null;
        }
    }
  return (
      <Row>
        <Col className="d-none d-md-block">
            <Image src={AccountImg} alt="account" />
            <h3>Create an Account</h3>
            <p>If you an restaurant owner then please check "Register as Restaurant" and fill up the required details.</p>
        </Col>
        <Col>
            <form onSubmit={handleSubmit}>

            <h3>Log in</h3>

            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="form-control" placeholder="Enter email" required />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password"  name="password" className="form-control" placeholder="Enter password" required />
            </div>

            {/* <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" name="remember" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div> */}
            {process ? <Button variant="primary" size="lg" block disabled> <Spinner as="span" animation="border" size="lg" role="status"      aria-hidden="true"/><span className="sr-only">Loading...</span> </Button> : <Button variant="primary" type="submit" size="lg" block >Sign in</Button> }            
            <p className="forgot-password text-right">
                Create new <a href="#" onClick={gotoSignup} >Account</a>
            </p>
            <LoginMsg />
        </form>
    </Col>
  </Row>
  )
}