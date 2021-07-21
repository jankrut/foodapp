import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import UserListItem from './UserListItem';
import { getData } from './Utils';

export default function UserList(props) {
  const [users, setUsers] = useState([])
  const [blockedUsers, setblockedUsers] = useState(props.selRestaurant.blocked)
   
  function toggleBlock(id) {
    // console.log("blocked",props.selRestaurant.blocked,id)
    let blocked;
    if(blockedUsers.includes(id)){
      blocked = blockedUsers.filter(userid=> userid !== id)
    }else{
      blocked = [...blockedUsers,id];
    }
    getData(`mutation {updateOneRestaurant (query: {_id: "${props.selRestaurant._id}"}, set: {blocked:["${blocked.join('","')}"]}) {_id name desc blocked}}`,(res)=>{
      if(res.data.updateOneRestaurant._id){
        props.setSelRestaurant(res.data.updateOneRestaurant)
        setblockedUsers([...blocked])
      }
    })
  }
  const userLists = users.map(user=><UserListItem key={user._id} blocked={blockedUsers.includes(user._id)?true:false} user={user} toggleBlock={toggleBlock} />)

  useEffect(() => {
    getData(`query { profiles(query:{type:"regular"}){_id firstname lastname}}`, (data)=>{
      if(data.data.profiles.length){
        setUsers(data.data.profiles);
      }
    })
  }, []);
  if(!users.length) return(<Spinner animation="border" variant="primary" className="spinner" />)
  return (
    <Container>
    <Row className="border-bottom mb-3">
      <Col xs={12} md={6}>
        <h3>Block user for {props.selRestaurant.name}</h3>
      </Col>
    </Row>
    <Row>
        {userLists}
    </Row>
    </Container>
  )
}