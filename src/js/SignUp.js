import React, { useState } from "react";
import { Row, Col,Image, Alert, Button, Spinner } from 'react-bootstrap';
import AccountImg from '../images/account.PNG'
import { getData, setUser } from "./Utils";
export default function SignUp(props) {
    const [restInfo, setRestinfo] = useState(false);
    const [Signuperror, setSignuperror] = useState("");
    const [process, setProcess] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        console.log("this",this);
        console.log("event",e.currentTarget);
        const frm = e.currentTarget;
        const email = frm.email.value;
        const firstname = frm.firstname.value;
        const lastname = frm.lastname.value;
        const pass = frm.password.value;
        const as_restaurant = frm.as_restaurant.checked;
        let resname = "", resdesc = "", type="regular";
        if(as_restaurant){
            type="owner";
            // resname = frm.resname.value;
            // resdesc = frm.resdesc.value;
        }
        signup(email,pass,firstname,lastname,type,resname,resdesc);
        setProcess(true)
    }
    const signup = (email,pass,firstname,lastname,type,resname,resdesc) => {
        getData(`mutation { insertOneProfile(data: {email:"${email}",password:"${pass}",firstname:"${firstname}",lastname:"${lastname}",type:"${type}",resname:"${resname}",resdesc:"${resdesc}",blocked:"[]"}) { _id email firstname lastname type resname resdesc blocked }}`, signupresponse)
    }
    let signupresponse = (data) => {
        if(data.errors){
            // setSignuperror(data.errors[0].message);
            setProcess(false)
            setSignuperror("Please use another email address.");
        }else if(data.data.insertOneProfile._id){
            // props.setIsLoggedIn(true);
            console.log("user", data.data.insertOneProfile._id);
            const user = data.data.insertOneProfile;
            props.setUser(user);
            if(user.type === "owner"){
                gotoPage("restaurant");
              }else{
                gotoPage("restaurants");
            }
            // this.setState({login:true})
            // this.getProjects(data.data.users[0]._id);
        }else{
            setProcess(false)
            props.setUser({});
            console.log("something went wrong, please try again later !")
            setSignuperror("something went wrong, please try again later !")
        }
    }
    let SignUpMsg = () => {
        if(Signuperror !== ""){
            return <Alert variant='danger' onClose={() => {setSignuperror("")}} dismissible>{Signuperror}</Alert>
        }else{
            return null;
        }
    }
    function gotoPage(pageName){
        props.setPage(pageName)
    }
    function gotoSignin(){
        gotoPage('signin')
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
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" name="firstname" className="form-control" placeholder="First name" required/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" name="lastname" className="form-control" placeholder="Last name" required/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email"required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" required/>
                </div>
                <div className="form-check">
                    <input type="checkbox" name="as_restaurant" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Register as Restaurant Owner</label>
                </div>
                {process ? <Button variant="primary" size="lg" block disabled> <Spinner as="span" animation="border" size="lg" role="status"      aria-hidden="true"/><span className="sr-only">Loading...</span> </Button> : <Button variant="primary" type="submit" size="lg" block >Register</Button> }         
                <p className="forgot-password text-right">
                    Already registered <a href="#" onClick={gotoSignin} >log in?</a>
                </p>
                <SignUpMsg />
            </form>
        </Col>
        </Row>
    );
}