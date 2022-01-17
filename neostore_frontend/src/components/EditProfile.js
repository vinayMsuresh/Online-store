import React, { useState,useEffect } from 'react'
import { Container,Row,Col,Alert,Button,Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import {editData} from '../config/MyService'
import MyAccount from './MyAccount';
const GREY = "#9E9E9E";
export default function EditProfile() {
    const navigate=useNavigate()
    let [firstname,setfirstname]=useState('')
    let [lastname,setlastname]=useState('')
    let [email,setemail]=useState('')
    let [gender,setgender]=useState('')
    let [phone_number,setPhone]=useState('');
    let [error, setError] = useState(false);
    
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
            setfirstname(data.first_name);
            setlastname(data.last_name);
            setemail(data.email)
            setgender(data.gender)
            setPhone(data.phone_no)
      },[])
     const editdata=()=>{
         let data={first_name:firstname,last_name:lastname,email:email,phone_no:phone_number,gender:gender};
         editData(data)
         .then(res=>{
            if(res.data.err){
                setError(res.data.err)
            }
            else{
                alert(res.data.msg)
                localStorage.setItem('user',JSON.stringify(res.data.userdata))
                navigate('/userprofile')
            }
         })
     }
    return (
        <>
            <Container className="mt-5">
            {error && <Alert  variant='danger' onClose={()=>setError(false)} dismissible>
                    {error}
                    </Alert>}
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
                                    <Form.Control type="text"  defaultValue={Profile.first_name} name="firstname" onChange={(e)=>setfirstname(e.target.value)}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Last Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control defaultValue={Profile.last_name}  name="lastname" onChange={(e)=>setlastname(e.target.value)} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Email
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control defaultValue={Profile.email}   name="email" onChange={(e)=>setemail(e.target.value)}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Gender
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control defaultValue={Profile.gender}  name="gender" onChange={(e)=>setgender(e.target.value)}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Phone Number
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control defaultValue={Profile.phone_no}  name="phone_number" onChange={(e)=>setPhone(e.target.value)} />
                                    </Col>
                                </Form.Group>
                                </Form>
                                <Button variant="outline-dark" className="mb-3" onClick={editdata} >Update</Button>
                        </Container>
                    </Col>
                </Row>
                </Container>
                <Container className='mt-5'>
                </Container>
                
        </>
    )
}
