import React,{useState, useEffect} from 'react'
import { Container,Row, Col,Card,Button } from 'react-bootstrap';
import { getOrder } from '../config/MyService';
import { useNavigate } from 'react-router-dom';
import MyAccount from './MyAccount';
import { MAIN_URL } from '../config/Url';
import Pdf from './Pdf';
import moment from 'moment';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
const GREY = "#9E9E9E";
export default function Order() {
    let [products,setProducts] = useState([]);
    let [id, setId] = useState(0);
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        console.log(user);
        if(user){
            getOrder(user.email)
            .then(res=>{
                if(res.data.err){
                    console.log(res.data.err);
                }
                else{
                    setProducts(res.data.order);
                }
            })
        }
        else{
            navigate('/login')
        }
    },[]);
    const generatePdf = (id) => {
        sessionStorage.setItem('order_id',id);
        setId(id);
        const input = document.getElementById('pdf');
       setTimeout(()=>{ input.style.display = 'block';
        html2canvas(input,{useCORS:true}).then(canvas => {
            const pdf = new jsPDF();
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();
            const img = canvas.toDataURL(
                "/images/1.jpg"
            );
            pdf.addImage(img, "JPG", 0, 0, width, height);
            pdf.save("download.pdf");
        })
        input.style.display = 'none';
        setId(0);},2000);
        
    };
    const styles = {
        well: {
            border: `1px solid ${GREY}`,
          boxShadow: `1px 3px 1px ${GREY}`,
          TextAlign:'center'
        },
      };
    return (
        <div>
            <Container className="m-5">
            <h1 className='p-2 bg-secondary'>My Orders</h1>  
                <Row>
                    <Col md={4}>
                    <MyAccount/>
                    </Col>
                    <Col md={8}>
                    
                        <Container style={styles.well} className='p-3 mt-4'>
                        {products.length >= 1 ?
                        products.map(prd=>
                        <Card key={prd._id} style={{textAlign:'left'}}>
                            <Card.Body>
                            <h5>Order No: {prd._id}</h5>
                            <Card.Text>                            
                            Placed on: {moment(prd.created_at).format('DD-MM-YYYY')} / 
                            <p className='text-success d-inline'> ${prd.quantity * prd.product_id.product_cost}</p>
                            </Card.Text>
                            <hr/>
                        <img src={`${MAIN_URL}${prd.product_id.category_id}/${prd.product_id.product_image}`} 
                        width='150px' height='100px' />                      
                           <hr/>
                            <Button variant="primary" active onClick={()=>generatePdf(prd._id)}>Download invoice as pdf</Button>
                            </Card.Body>
                        </Card>):
                  <h4 className='m-4'>No orders placed</h4>}
                        </Container>
                    </Col>
                </Row>
                <div style={{display:'none'}} id='pdf'>
                    {id.length>0 && <Pdf id={id} /> }               
                </div>
            </Container>
        </div>
    )
}
