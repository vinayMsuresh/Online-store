import React,{useState, useEffect} from 'react';
import { getProducts } from '../config/MyService';
import { useNavigate } from 'react-router-dom';
import { Navbar,Nav,Container,InputGroup, FormControl, Button, NavDropdown,Modal, Row,Col,Card } from 'react-bootstrap'
export default function Header() {
  let [product_data, setProduct_data] = useState([]);
  let [filtered, setFiltered] = useState([]);
  let [product, setProduct] = useState();
  const navigate = useNavigate(); 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  useEffect(()=>{
    getProducts()
        .then(res=>{
            if(res.data.err){
                alert(res.data.err)
            }else{
                setProduct_data(res.data.products);
            }
          });
  },[]);

  const handleInput=(e)=>{
    setShow(true)
    const value = e.target.value;
    setProduct(e.target.value);
    console.log(product_data[0].product_name)
    const filteredData = product_data.filter(element =>
      element.product_name.toLowerCase().includes(value.toLowerCase()));
    console.log(filteredData)
    setFiltered(filteredData);
  }
  const senddata=(id)=>{
   
    navigate('/product_details',{
        state:{id:id}
    })
    setShow(false);
    window.location.reload();
  }
    const navDropdownTitle = (<i className="fas fa-user text-dark"></i>);
    return (
        <div>
            <Navbar bg="dark" expand="lg">
  <Container>
    <Navbar.Brand href="/"><h2 className='text-white'><b>Neo<div className='text-danger d-inline'>STORE</div></b></h2></Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px', marginLeft: '14%' }}
        navbarScroll
      >
        <Nav.Link href="/" className='text-white'><h6>Home</h6></Nav.Link>
        <Nav.Link href="/products" className='text-white' style={{marginLeft:'17%'}}><h6>Products</h6></Nav.Link>
        <Nav.Link href="/order" className='text-white' style={{marginLeft:'17%'}}><h6>Orders</h6></Nav.Link>
      </Nav>
      <InputGroup className="d-flex" style={{marginLeft:"1%", width:"22%"}}>
    <InputGroup.Text id="basic-addon1"><span className='fa fa-search'></span></InputGroup.Text>
    <FormControl placeholder="search" value={product} onChange={(e)=>handleInput(e)} />
  </InputGroup>
  
  <Button variant="outline-light" href='/cart' className='bg-white text-dark' style={{marginLeft:'1%'}}><i className="fas fa-shopping-cart d-inline"></i> Cart</Button>
  <NavDropdown variant="outline-dark" title={navDropdownTitle}  id="basic-nav-dropdown" className='bg-white text-dark' style={{ height: '5%', marginLeft: '1%' }}>
  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
       </NavDropdown>
    </Navbar.Collapse>
  </Container>
</Navbar>
<Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Search Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup>
        <InputGroup.Text id="basic-addon1"><span className='fa fa-search'></span></InputGroup.Text>
    <FormControl placeholder="search" value={product} onChange={(e)=>handleInput(e)} />
  </InputGroup>
  {filtered.length > 0 && filtered.map(pd=>
  <Card key={pd._id} onClick={()=>senddata(pd._id)}>
  <Card.Body>{pd.product_name}</Card.Body>
</Card>)
  }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}
