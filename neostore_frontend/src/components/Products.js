import React,{useState,useEffect} from 'react'
import { Container,Row,Col,Card,Button,Dropdown,DropdownButton, Nav,Alert} from 'react-bootstrap'
import { MAIN_URL } from '../config/Url'
import { getProducts, getAllCategories, getAllColors,getCategoryProducts,getColorProducts,addToCart } from '../config/MyService'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
const GREY = "#9E9E9E";
export default function Products() {
    let user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [perPage] = useState(5);
    const [pageCount, setPageCount] = useState(0)
    const [offset, setOffset] = useState(0);
    const [product,setProduct]=useState([]);
    const [product_data, setProduct_data] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [error, setError] = useState(false);
    const styles = {
        well: {
            // border: `1px solid ${GREY}`,
          boxShadow: `3px 3px 3px 3px ${GREY}`,
          TextAlign:'center'
        },
        drop:{
            width:300,border:'1px solid black'
        },
      };
     
      useEffect(()=>{
          getAllCategories()
          .then(res=>{
              setCategories(res.data.categories);
          });

          getAllColors()
          .then(res=>{
              setColors(res.data.colors);
          });
          getProducts()
          .then(res=>{
              if(res.data.err){
                  alert(res.data.err)
              }else{
                  setProduct_data(res.data.products);
         getData(res.data.products);
              }
            });
      },[offset]);
      const senddata=(id)=>{
        console.log(id)
        localStorage.setItem('id',JSON.stringify(id))
        navigate('/product_details',{
            state:{id:id}
        })
    }
      const AllData = () =>{
        getProducts()
        .then(res=>{
            if(res.data.err){
                alert(res.data.err)
            }else{
                setProduct_data(res.data.products);
       getData(res.data.products);
            }
          });
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
      const getData = (data) => {
                  const slice = data.slice(offset, offset + perPage);
                  const postData =<Row>{slice.map(pd => <Col lg={4} md={6}><Card key={pd._id} className="m-3 p-3">
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
                  setProduct(postData)
                  setPageCount(Math.ceil(data.length / perPage))
    }
    const handlePageClick = (e) => {
      const selectedPage = e.selected;
      setOffset(selectedPage + 1)
  };

  const sortAsc = () =>{
      const sort_products = product_data;
    sort_products.sort(function (a, b) {
        return a.product_cost - b.product_cost;
      });
      setProduct_data(sort_products);
      getData(sort_products);
  }
  const sortDsc = () =>{
    const sort_products = product_data;
    sort_products.sort(function (a, b) {
        return b.product_cost - a.product_cost;
      });
      setProduct_data(sort_products);
      getData(sort_products);
}
const sortRating = () =>{
    const sort_products = product_data;
    sort_products.sort(function (a, b) {
        return a.product_rating - b.product_rating;
      });
    setProduct_data(sort_products);
    getData(sort_products);
}
  const handleCategorySelect = (id) =>{
      getCategoryProducts(id)
      .then(res=>{
        setProduct_data(res.data.products);
        getData(res.data.products);
      })
  }

  const handleColorSelect = (id) =>{
    getColorProducts(id)
      .then(res=>{
          console.log(res.data.products);
        setProduct_data(res.data.products);
        getData(res.data.products);
      })
}

    return (
        <>
                <Container className='mt-5'>
                {error && <Alert  variant='warning' onClose={()=>setError(false)} dismissible>
                    {error}
                    </Alert>}
                    <Row>
                        <Col sm={2} style={styles.well}>
                        <Button className='mt-5' variant='outline-primary' onClick={AllData}>All Products</Button>
                        <DropdownButton className='mt-5'
                            variant='primary'
                            title='categories'
                            >
                          
                                {categories.map(category=>
                            <Dropdown.Item key={category._id} onClick={()=>handleCategorySelect(category._id)} >{category.category_name}</Dropdown.Item>
                                    )
                                }
                            </DropdownButton>
                            <DropdownButton 
                            variant="primary"
                            title="Color"
                         className=' mt-5 mb-5'
                            >
                             {colors.map(color=>
                            <Dropdown.Item key={color._id} onClick={()=>handleColorSelect(color._id)}>{color.color_name}</Dropdown.Item>
                                    )
                                }
                            </DropdownButton>

                        </Col>
                        <Col sm={10} style={styles.well} className='p-3 bg-dark'>
                           <Nav className='justify-content-end'>
                           <Nav.Item className='mx-3'>
                              <p className='mt-2'>Sort By:</p>
                               </Nav.Item>
                           <Nav.Item className='mx-3'>
                                <Button variant='primary' onClick={sortRating}><i className="fas fa-star"></i></Button>
                               </Nav.Item>
                               <Nav.Item className='mx-3'>
                                <Button variant='primary' onClick={sortAsc}><i class="fas fa-sort-numeric-up"></i></Button>
                               </Nav.Item>
                               <Nav.Item className='mx-3'>
                                <Button variant='primary' onClick={sortDsc}><i class="fas fa-sort-numeric-down"></i></Button>
                               </Nav.Item>
                           </Nav>
                       
                        {product} 
                        
                    
                    
                    <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    </Col>
                    </Row>
            </Container>
            <Container fluid className="mt-3">
            </Container>
          
        </>
    )
}

