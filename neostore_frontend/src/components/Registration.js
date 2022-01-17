import React,{useState} from 'react'
import { Container,Form,Button,Row,Col,Alert} from 'react-bootstrap'
import { registerUser,socialLoginUser } from '../config/MyService';
import { useNavigate } from 'react-router';
import SocialButton from './SocialButton';
import Footer from './Footer';
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export  default function Registration(){
        let [email,setEmail]=useState('');
        let [password,setPassword]=useState('');
        let [cpassword,setCpassword]=useState('');
        let [firstname,setFirstname]=useState('');
        let [lastname,setLastname]=useState('');
        let [phone,setPhone] = useState(0);
        let [gender,setGender]=useState('');
        let [error, setError] = useState(false);
        const navigate=useNavigate();
        const handleSocialLogin = (user) => {
          console.log(user);
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
        const register=()=>{            
            let data={email:email,password:password,first_name:firstname,last_name:lastname,gender:gender,phone:phone};
            console.log(data);
            registerUser(data)
            .then(res=>{
                if(res.data.err){
                    setError(res.data.err)
                    // console.log(res.data.err)
                }
                else{
                    alert(res.data.msg)
                    navigate('/login');
                }
            });
        }
    return (
        <>
            <Container className="mt-3">
              {error && <Alert  variant='danger' onClose={()=>setError(false)} dismissible>
                    {error}
                    </Alert>}
                <SocialButton
      provider="facebook"
      appId="3072436129656623"
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
      autoCleanUri={true}
      variant="danger"
      style={{marginTop:30,marginLeft:100,fontSize:20,width:350}}
      
    ><i className='fab fa-facebook-square m-2'></i>
      Login with Facebook
    </SocialButton>
    <SocialButton
      provider="google"
      appId="806054647602-bp69c6pg6tgshmeevu8v15ns1t9vp3og.apps.googleusercontent.com"
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
      autoCleanUri={true}
      variant="primary"
      style={{marginTop:30,marginLeft:100,fontSize:20,width:350}}
    ><i className="fab fa-google m-2"></i>
      Login with Gmail
    </SocialButton>
            
        <Container className="mt-3" >
        <h2 className='m-4'>Register to Neostore</h2>
        <Form className='m-4'>
        
        <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                FirstName
                </Form.Label>
                <Col sm="7">
                <Form.Control  type="text" placeholder="Enter First Name" name="firstname" onChange={(e)=>{setFirstname(e.target.value)}}/>
                {firstname!=='' && firstname.length < 4 && <span className="text-danger">Enter first name atleast of 4 characters</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                LastName 
                </Form.Label>
                
                <Col sm="7">
                <Form.Control  type="text" placeholder="Enter Last Name" name="mobile" onChange={(e)=>{setLastname(e.target.value)}}/>
                {lastname!=='' && lastname.length < 2 && <span className="text-danger">Enter last name atleast of 2 characters</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Email
                </Form.Label>
                <Col sm="7">
                <Form.Control  type="text" placeholder="Enter Email Id" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                {email!=='' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                </Col>                
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Phone 
                </Form.Label>
                <Col sm="7">
                <Form.Control  type="tel" placeholder="Enter Phone number" name="phone" onChange={(e)=>{setPhone(e.target.value)}}/>
                {phone!==0 && !phone.length === 10 && <span className="text-danger">Enter Phone number correctly</span>}
                </Col>                
            </Form.Group>
            <fieldset>
    <Form.Group as={Row} className="mb-3">
      <Form.Label as="legend" column sm={2}>
        Gender
      </Form.Label>
      <Col sm={3}>
        <Form.Check
          type="radio"
          label="Male"
          name="gender"
          id="Male"
          value="Male"
          onClick={(e)=>setGender(e.target.value)}
        />
        </Col>
        <Col sm={3}>
        <Form.Check
          type="radio"
          label="Female"
          name="gender"
          id="Female"
          value="Female"
          onClick={(e)=>setGender(e.target.value)}
        />
      </Col>
    </Form.Group>
  </fieldset>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm="2">
                Password
                </Form.Label>
                <Col sm="7">
                <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                {password!=='' && password.length < 8 && <span className="text-danger">Enter password  atleast of 8 characters</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm="2">
                Confirm Password
                </Form.Label>
                <Col sm="7">
                <Form.Control type="password" placeholder="Confirm Password" name="cpassword" onChange={(e)=>{setCpassword(e.target.value)}} />
                {cpassword!=='' && cpassword !== password && <span className="text-danger">Passwords doesn't match</span>}
                </Col>
            </Form.Group>
            
            <Button variant="outline-success" className='mb-5' onClick={register}>Register</Button>
            
            </Form>
        </Container>
        
        </Container>
        </>
    )
}