import React, { useState,useEffect } from 'react'
import { Container,Row,Col,Button,Form,Alert } from 'react-bootstrap';
import {addAddressto} from '../config/MyService'
import { useNavigate } from 'react-router-dom';
import MyAccount from './MyAccount';

const GREY = "#9E9E9E";
export default function Addaddress() {
    let [address,setAddress]=useState('');
    let [pincode,setPincode]=useState('');
    let [city,setCity]=useState('');
    let [state,setState]=useState('');
    let [country,setCountry]=useState('');
    let [error, setError] = useState(false);
    const navigate = useNavigate();
    const styles = {
        well: {
            border: `1px solid ${GREY}`,
          boxShadow: `1px 3px 1px ${GREY}`,
          TextAlign:'center'
        },
      };
      const addAddress=()=>{
          let data={address_line:address,pincode:pincode,city:city,state:state,country:country};
          let email=JSON.parse(localStorage.getItem('user')).email;
          console.log(email)
            addAddressto(data,email)
            .then(res=>{
                if(res.data.err){
                    setError(res.data.err)
                }else{
                    alert(res.data.msg);
                    console.log(res.data.userdata);
                    localStorage.setItem('user',JSON.stringify(res.data.userdata));
                    let user = JSON.parse(localStorage.getItem('user'));
                    user.address.push(data);
                    localStorage.setItem('user',JSON.stringify(user));
                    navigate('/editaddress');
                }
            })
      }
    return (
        <>
            <Container className="mt-5">
            {error && <Alert  variant='danger' onClose={()=>setError(false)} dismissible>
                    {error}
                    </Alert>}
            <h1 className='p-2 bg-secondary'>My Address</h1>
                <Row>
                    <Col md={4}>
                  <MyAccount/>
                    </Col>
                    <Col md={8}>
                        <Container style={styles.well} className='mt-5'>
                        <Form className='p-3'>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="Enter Address" name="address"  value={address} onChange={(e)=>setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control placeholder="Enter Pincode" name="pincode"  value={pincode} onChange={(e)=>setPincode(e.target.value)} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control placeholder="Enter City" name="city" value={city} onChange={(e)=>setCity(e.target.value)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            {/* <Form.Select defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option
                                >
                            </Form.Select> */}
                                <Form.Control placeholder="Enter State" name="state" value={state} onChange={(e)=>setState(e.target.value)}/>
                            </Form.Group>

                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Country</Form.Label>
                            <Form.Control placeholder="Enter Country" name="country" value={country} onChange={(e)=>setCountry(e.target.value)} />
                        </Form.Group>
                        <Button variant="outline-success" className="mb-3"  onClick={addAddress}>Add Address</Button>
                        </Form>
                        </Container>
                    </Col>
                </Row>
                </Container>
                <Container fluid className='mt-5'>
                </Container>
                
        </>
    )
}
