import React,{useState} from 'react'
import { Button, Container,Table, Form } from 'react-bootstrap';
import pdf from '../Terms_and_Conditions.pdf';
import { useNavigate } from 'react-router-dom';
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export default function Footer() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleSubmit = ()=>{
    if(regForEmail.test(email)){
      sessionStorage.setItem('subscriber',email);
      navigate('/thanks');
    }
    else{
      alert("Enter Email correctly")
    }
  }
    return (
        <div className='bg-dark footer'>
            <Container>
            <Table borderless variant="dark">
  <thead>
    <tr>
      <th>About Company</th>
      <th>Information</th>
      <th>NewsLetter</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p>NeoStore is here at your quick and many service<br/>
      for shopping<br/>Contact information<br/>Email: contact@neosofttech.com
      <br/>Phone: +91 0014568978</p></td>
      <td><p><a href={pdf} className='text-decoration-none text-white mt-1' target='_blank'>Terms and conditions</a><br/>
      Queries and Return Policy<br/>Contact Us<br/>Privacy Policy
      <br/><a href='/locateus' className='text-decoration-none text-white mt-1' target='_blank'>Locate Us</a></p></td>
      <td><p>Sign up to get offer from our favorite brands and to<br/>
      be well up in the news.</p>
      <Form className='d-flex justify-content-center mt-1'>
      <Form.Control size="sm" type="text" placeholder="Your email..." style={{width:'35%'}} onChange={(e)=>setEmail(e.target.value)} />      
      </Form>
      <Button variant='outline-light' className='bg-white text-dark m-1' size='sm' onClick={handleSubmit}>Subscribe</Button>
   </td>
    </tr>
  </tbody>
</Table>
</Container>
        </div>
    )
}
