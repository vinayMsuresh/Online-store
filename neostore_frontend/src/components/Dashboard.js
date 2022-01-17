import React,{useState,useEffect} from 'react'
import { Container,Row,Col,Card,Button,Carousel,Alert} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import { MAIN_URL } from '../config/Url'
import { getProducts, getAllCategories,addToCart } from '../config/MyService'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const GREY = "#9E9E9E";
export default function Dashboard() {
    let user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [product_data, setProduct_data] = useState([]);
    const [categories, setCategories] = useState([]);
    let [error, setError] = useState(false);

      useEffect(()=>{
        if(user){
          let token = localStorage.getItem('_token');
          let decode = jwt_decode(token);
          localStorage.setItem('uid',decode.uid);
        }
        getAllCategories()
          .then(res=>{
              setCategories(res.data.categories);
          });
          getProducts()
          .then(res=>{
              if(res.data.err){
                  alert(res.data.err)
              }else{
                  setProduct_data(res.data.products.slice(2,8));
              }
            });
      },[]);
      const senddata=(id)=>{
        console.log(id)
        localStorage.setItem('id',JSON.stringify(id))
        navigate('/product_details',{
            state:{id:id}
        })
    }

    const handleCart = (id) =>{
      if(user){
        let body = {email:user.email, id:id};
       addToCart(body)
       .then(res=>{
         if(res.data.err){
           setError(res.data.err);
         }
         else{
           alert(res.data.msg);
           window.location.reload();
         }
       })
      }
      else{
         alert("Please Login before buying the products")
         navigate('/login');
      }
     }

    return (
        <>
                <Container fluid className='mt-2'>
                {error && <Alert  variant='warning' onClose={()=>setError(false)} dismissible>
                    {error}
                    </Alert>}
                <Carousel>
{ categories.map(cat=> <Carousel.Item key={cat._id}>
    <img
      className="d-block w-100"
      src={`${MAIN_URL}/${cat.product_image}`}
      height={300}
    />
    <Carousel.Caption>
      <h3 className='text-warning'>{cat.category_name}</h3>
    </Carousel.Caption>
  </Carousel.Item>)}
 
</Carousel>
<hr/>
<Button href='/products' variant='outline-primary' className='m-2'>View All</Button>
<h2 className='m-2'>Popular products</h2>
<Container className='mt-3'>
<Row>{product_data.map(pd => <Col lg={4} md={6}><Card key={pd._id} className="m-3 p-3">
        <Card.Img variant="top" src={`${MAIN_URL}${pd.category_id._id}/${pd.product_image}`} width="200" height="200" 
        onClick={()=>senddata(pd._id)} />
        <Card.Title>{pd.product_name}</Card.Title>
        <Card.Text  className='text-weight-bolder'>$ {pd.product_cost}</Card.Text>
        <Card.Text> <Rating
                name="text-feedback"
                value={pd.product_rating}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              /></Card.Text>
        <Button variant='danger' className="mt-3" onClick={()=>handleCart(pd._id)}>Add Cart</Button>
    </Card></Col>)}</Row>
    </Container>
            </Container>          
        </>
    )
}

