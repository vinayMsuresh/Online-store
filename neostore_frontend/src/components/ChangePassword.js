import React,{useState} from 'react'
import {Form,Row,Col,Button,Container} from 'react-bootstrap';
import { updpassword } from '../config/MyService';
import { useNavigate } from 'react-router-dom';
import MyAccount from './MyAccount';

export default function ChangePassword() {
    const navigate=useNavigate();
    let [old_password,setOPassword]=useState('');
    let [password,setPassword]=useState('');
        let [cpassword,setCpassword]=useState('');
        const change=()=>{
            let data = JSON.parse(localStorage.getItem('user'));
            console.log(data);
            if(password === cpassword){
                let change_data = {old_password:old_password, password:password,email:data.email};
                updpassword(change_data)
                .then(res=>{
                    if(res.data.err)
                {
                    alert(res.data.err)
                }
                else{
                    alert(res.data.msg)
                    navigate('/userprofile')
                }
                })
            }
        }
    return (
        <div className='mb-3'>
            <Container className="mt-5">
            <h1 className='p-2 bg-secondary'>Change Password</h1>  
            <Row>
                <Col lg='4' md={4}>
                    <MyAccount/>
                </Col>
                <Col lg='8' md={8}>
            <Form className='mt-5 p-4' style={{marginLeft:'20%',marginRight:'20%',border:'1px solid black'}}>
                
            <Form.Group  className="mb-3" >
                <Form.Control type="password" placeholder=" Enter Old Password" name="old_password" onChange={(e)=>{setOPassword(e.target.value)}}/>
                {old_password!=='' && old_password.length < 8 && old_password!==password &&<span className="text-danger">Enter  old password  correctly</span>}
          
            </Form.Group>
            <Form.Group  className="mb-3" >
                <Form.Control type="password" placeholder=" New Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                {password!=='' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
               
            </Form.Group>
            <Form.Group  className="mb-3" >
              
                <Form.Control type="password" placeholder="Confirm Password" name="cpassword" onChange={(e)=>{setCpassword(e.target.value)}} />
                {cpassword!=='' && cpassword !== password && <span className="text-danger">Passwords doesn't match</span>}
                
            </Form.Group>
            <Button variant='primary' onClick={change}>ChangePassword</Button>
            </Form>
            </Col>
            </Row>
            </Container>
        </div>
    )
}
