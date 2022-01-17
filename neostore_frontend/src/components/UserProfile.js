import React, { useState,useEffect } from 'react'
import { Container,Row,Col,Table,Button,Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import MyAccount from './MyAccount';

const GREY = "#9E9E9E";
export default function UserProfile() {
    const navigate=useNavigate()
    const [Profile,setProfile]=useState([])
    const styles = {
        well: {
            border: `1px solid ${GREY}`,
          boxShadow: `1px 3px 1px ${GREY}`,
          TextAlign:'center'
        },
      };
      useEffect(()=>{
            let data=JSON.parse(localStorage.getItem("user"))
            console.log(data)
            setProfile(data)
      },[])
     const edit=()=>{
         navigate('/editdata')
     }
    return (
        <>
            <Container className="mt-5">
                <h1 className='p-2 bg-secondary'>My Account</h1>
                <Row>
                    <Col md={4}>
                        <MyAccount/>
                    </Col>
                    <Col md={8}>
                        <Container style={styles.well} className='mt-5'>
                                <Form className='p-3'>
                                    
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    First Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={Profile.first_name} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Last Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={Profile.last_name} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Email
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={Profile.email} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Gender
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={Profile.gender} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Phone Number
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={Profile.phone_no} />
                                    </Col>
                                </Form.Group>
                                </Form>
                                <Button variant="outline-secondary" className="mb-3" onClick={edit} ><i class="fas fa-edit"></i> Edit</Button>
                        </Container>
                    </Col>
                </Row>
                </Container>
                <Container className='mt-5'>
                </Container>
              
        </>
    )
}
