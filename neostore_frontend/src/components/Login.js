import React,{useState} from 'react'
import { Container,Row,Col, Button,Form, Alert} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { loginUser,socialLoginUser } from '../config/MyService';
import SocialButton from './SocialButton';
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Login() {
    let [email, setEmail] = useState('');
    let [password, setpassword] = useState('');
    let [error, setError] = useState(false);
    const navigate = useNavigate();
    const handleSocialLogin = (user) => {
        console.log(user);
        let user_data = {email:user._profile.email,first_name:user._profile.firstName, last_name:user._profile.lastName};
        socialLoginUser(user_data)
        .then(res=>{
          if(res.data.err){
            setError(res.data.err);
          }
          else{
            alert(res.data.msg);
            localStorage.setItem('user',JSON.stringify(res.data.userdata));
            localStorage.setItem('_token',res.data.token);
        navigate('/');
        window.location.reload();  
          }
        })
            
      };
      
      const handleSocialLoginFailure = (err) => {
        console.error(err);
       
      };


      const handleLogin = () =>{
          if(!regForEmail.test(email) || password.length < 8){
              setError("Enter username and password properly");
          }
          else{
            let data={email:email,password:password};
            console.log(data);
            loginUser(data)
            .then(res=>{
                if(res.data.err){
                    setError(res.data.err)
                }
                else{
                    alert(res.data.msg);
                    localStorage.setItem('_token',res.data.token);
                    localStorage.setItem('user',JSON.stringify(res.data.userdata));                    
                    navigate('/');
                    window.location.reload();
                }
            });
          }
      }
    return (
            <Container className='mt-5' style={{marginBottom:"82px"}}>
              {error && <Alert  variant='danger' onClose={()=>setError(false)} dismissible>
                    {error}
                    </Alert>}
                <Row>
                    <Col md={6}>
                    <SocialButton
      provider="facebook"
      appId="3072436129656623"
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
      autoCleanUri={true}
      variant="danger"
      style={{marginTop:30,marginLeft:'6%',width:'50%',fontSize:20}}
      
    ><i className='fab fa-facebook-square m-2 '></i>
      Login with Facebook
    </SocialButton><br/>
    <SocialButton
      provider="google"
      appId="806054647602-bp69c6pg6tgshmeevu8v15ns1t9vp3og.apps.googleusercontent.com"
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
      autoCleanUri={true}
      variant="primary"
      style={{marginTop:30,marginLeft:'6%',width:'50%',fontSize:20}}
    ><i className="fab fa-google m-2"></i>
      Login with Gmail
    </SocialButton>
                </Col>
                <Col md={6}>
    <h2>Login to NeoStore</h2>
                <Form className='mt-5'>
  <Form.Group as={Row} className="mb-3">
    <Form.Label column sm="2">
      Email
    </Form.Label>
    <Col sm="10">
      <Form.Control type="email" name='email' placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} />
      {email!=='' && !regForEmail.test(email) && <span className='text-danger m-2'>Enter email properly</span>}
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-4">
    <Form.Label column sm="2">
      Password
    </Form.Label>
    <Col sm="10">
      <Form.Control type="password" name='password' placeholder="Enter Password" onChange={(e)=>setpassword(e.target.value)} />
      {password!=='' && password.length < 8 && <span className='text-danger m-2'>Enter password of atleast 8 characters</span>}
    </Col>
  </Form.Group>
  <Button variant='outline-primary' className='m-3' type='button'  onClick={handleLogin}>Login</Button>
</Form>
                </Col>
                </Row>
                <Row>
                  <Col lg={5} md={5} className='d-flex justify-content-end'>
                  <Button variant='outline-dark' href='/register'>Register</Button>
                  </Col>
                  <Col lg={1} md={1}>
                  |
                  </Col>
                  <Col lg={5} md={5} className='d-flex justify-content-begin'>
                  <Button variant='outline-dark' href='/forgot'>Forgotten</Button>
                  </Col>
                </Row>
            </Container>
    )
}
