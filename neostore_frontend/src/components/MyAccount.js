import React,{useState,useEffect} from 'react'
import { Container,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MAIN_URL } from '../config/Url';
export default function MyAccount() {
    let [logo,setLogo]=useState('');
    let [firstname,setfirstname]=useState('')
    const navigate=useNavigate();
    const styles = {
        container :{ position: "relative "},
        img1 :{ display:" block",
                marginTop:10,
            marginLeft:50 },
      fa1 : { position: "absolute",
         bottom:20,
         left:230,
        backgroundColor:'white' }
      };
      useEffect(()=>{
        // let data=JSON.parse(localStorage.getItem("logo"))
            
            let data1=JSON.parse(localStorage.getItem('user'));
            if(data1){
            setLogo(data1.profile_img);
            setfirstname(data1.first_name + ' ' + data1.last_name);
            }
      },[])
      const upload=()=>{
          navigate('/addlogo');
      }
    return (
        <div>
              <Container style={styles.container}>
                    <img src={`${MAIN_URL}${logo}`}   className="rounded-circle " alt="Cinque Terre" width="230" height="150" style={styles.img1}/>
                    <Button variant='outline-primary' onClick={upload}  style={styles.fa1}><i className='fa fa-camera'></i></Button>
                       </Container>
                       <h5 className='mt-3'>{firstname}</h5>
                    <Container className='d-grid gap-2 mt-5' style={{textAlign:'justify'}}>
                        <Button variant='outline-primary' size='lg' href="/userprofile"><i className='fa fa-user p-2'></i>User Profile</Button>
                        <Button variant='outline-primary' size='lg' href="/editaddress"><i className='fas fa-address-card p-2'></i>Address</Button>
                        <Button variant='outline-primary' size='lg' href="/order"><i className='fa fa-user p-2'></i>Order</Button>
                        <Button variant='outline-primary' size='lg' href="/changepassword"><i className='fas fa-key p-2'></i>Change Password</Button>
                    </Container>
        </div>
    )
}
