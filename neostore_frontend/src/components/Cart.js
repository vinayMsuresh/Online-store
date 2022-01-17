import React,{useState,useEffect} from 'react'
import { Button, Col, Container, Row, Table, Card,Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCart,incproduct,decproduct,deleteOrder } from '../config/MyService';
import { MAIN_URL } from '../config/Url';

export default function Cart() {
    let [products,setProducts] = useState([]);
    let [total, setTotal] = useState(0);
    let [gst, setGst] = useState(0);
    let [error, setError] = useState(false);
    let [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        if(user){
            getCart(user.email)
            .then(res=>{
                if(res.data.err){
                    console.log(res.data.err);
                }
                else{
                    setProducts(res.data.cart);
                    const dt = res.data.cart.reduce((prev, cur)=>prev + cur.quantity * cur.product_id.product_cost,0);
                    setTotal(dt);
                    localStorage.setItem('cart_total',dt);
                    setGst(dt * 0.05)
                }
            })
        }
        else{
            navigate('/login')
        }
    },[]);
    const increment = (id) =>{
        let data = {email:user.email,product_id:id};
        incproduct(data)
        .then(res=>{
            if(res.data.err){
                setError(res.data.err);
            }
            else{          
                setSuccess(res.data.msg);
                setTimeout(()=>{
                window.location.reload();},2000);
            }
        })
    }
    const decrement = (id) =>{
        let data = {email:user.email,product_id:id};
        decproduct(data)
        .then(res=>{
            if(res.data.err){
                setError(res.data.err);
            }
            else{
                setSuccess(res.data.msg);
                setTimeout(()=>{
                    window.location.reload();},2000);
            }
        })
    }

    const buyProducts = ()=>{
        navigate('/selectaddress');
    }

    const deleteCart = (id) =>{
        deleteOrder(id)
        .then(res=>{
            if(res.data.err){
                setError(res.data.err);
            }
            else{                
                setSuccess(res.data.msg);
                setTimeout(()=>{
                    window.location.reload();},2000);
            }
        })
    }
    return (
        <>
            <Container className='mt-3'>
            {error && <Alert  variant='warning' onClose={()=>setError(false)} dismissible>
                    {error}
                    </Alert>}
            {success && <Alert  variant='success' onClose={()=>setSuccess(false)} dismissible>
            {success}
            </Alert>}
                <h2 className='m-3'>Your cart</h2>
                {products.length >= 1 ?
                <Row>
                    <Col lg='9' md={9}>
                <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                 {products.map(prd=>
                 <tr key={prd._id}>
                    <td style={{textAlign:'left'}}><Row><Col sm='3'><img src={`${MAIN_URL}${prd.product_id.category_id}/${prd.product_id.product_image}`} width='100px' height='100px'/>
                    </Col> <Col sm="5"><p className='d-inline'>{prd.product_id.product_name}<br/>
                    by {prd.product_id.product_producer}<br/>
                    Status: <div className='text-success d-inline'>In stock</div></p></Col></Row></td>
                    <td className='p-3'><Row>
                        <Col sm='5'><Button variant='danger' onClick={()=>increment(prd.product_id)}>+</Button></Col>
                        <Col sm='1' className='d-flex justify-content-center'><p className='mt-2'>{prd.quantity}</p></Col>
                        <Col sm='4'><Button variant='danger' onClick={()=>decrement(prd.product_id)}>-</Button></Col></Row></td>
                    <td className='p-3'>{prd.product_id.product_cost}</td>
                    <td className='p-3'>{prd.quantity * prd.product_id.product_cost}</td>
                    <td><Button variant='outline-danger' className='m-4' onClick={()=>deleteCart(prd._id)}><i className="fas fa-trash-alt"></i></Button></td>
                  </tr>)}
                  </tbody>
                  </Table>
                  </Col>
                  
                  <Col lg='3' md={3}>
                  <Card className='ml-3 mb-3'>
  <Card.Body>
    <Card.Title>Review Order</Card.Title>
    <Card.Text className='d-flex justify-content-between mt-4'>
     <p>Subtotal</p> <p>{total}</p>
    </Card.Text><hr/>
    <Card.Text className='d-flex justify-content-between'>
     <p>GST (5%)</p> <p>{gst}</p>
    </Card.Text><hr/>
    <Card.Text className='d-flex justify-content-between'>
     <p>Grand total</p> <p>{total + gst}</p>
    </Card.Text>
    <Button variant='primary' style={{width:'90%'}} className='mt-4' onClick={()=>buyProducts()}>Proceed to Buy</Button>
  </Card.Body>
</Card>
</Col>
</Row>:
                  <h4 className='mt-4' style={{marginBottom:'330px'}}>Your Cart is Empty</h4>}
            </Container>
          
        </>
    )
}
