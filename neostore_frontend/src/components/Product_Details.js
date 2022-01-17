import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { MAIN_URL } from "../config/Url";
import { Postrate,getItem,addToCart } from "../config/MyService";
import { useNavigate } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import "react-multiple-select-dropdown-lite/dist/index.css";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Alert,Row,Form,Col,Tabs,Tab } from "react-bootstrap";

 export default function Product_Details(props) {
   const styles={
     in:{
      display:"none"
     },
    
   }
  const [postdata, setPostdata] = useState([]);
  const [images, setimages] = useState([]);
  let [ischange,setChange]=useState(false)
  const [mainimage, setmainimage] = useState();
  let [color,setColor]=useState('')
  let [rate,setRate]=useState(0);
  let [error, setError] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    getItem(state.id)
      .then((res) => {
        setRate(res.data.product.product_rating);
        setPostdata(res.data.product);
        setmainimage(res.data.product.product_image);
        setimages(res.data.image);
        setColor(res.data.product.color_id.color_name)
      });
  }, []);
  const addrate=()=>{
    let upd_rate = (parseFloat(postdata.product_rating) + parseFloat(rate))/2;
    console.log((parseFloat(postdata.product_rating) + parseFloat(rate))/2);
    let data={rate:upd_rate}
    Postrate(data,state.id)
    .then(res=>{
      if(res.data.err){
        setError(res.data.err)
    }
    else{
        alert(res.data.msg);
        window.location.reload();
    }
    })
    setChange(false)
  }
  const handleCart = (id) =>{
    let user = JSON.parse(localStorage.getItem('user'))
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
  const rateproduct=()=>{
    setChange(true)
  }
  return (
    <div>
        <div className="container pt-4">
        {error && <Alert  variant='warning' onClose={()=>setError(false)} dismissible>
                    {error}
                    </Alert>}
          <div className="row">
            <div className="container  bg-light p-4 ">
              <div className=" row">
                <div className=" col-md-5">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        isFluidWidth: true,
                        src:`${MAIN_URL}${postdata.category_id}/${mainimage}`,
                      },
                      largeImage: {
                        src: `${MAIN_URL}${postdata.category_id}/${mainimage}`,
                        width: 900,
                        height: 900,
                      },
                    }}
                  />
              
                </div>
                <div className="col-md-6">
                  <div className="card1 pl-4">
                    <h3 className="mb-3">{postdata.product_name}</h3>
                    <div className="text-center">
                    <Rating
                name="text-feedback"
                value={rate}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
                    </div>
                    <hr />
                    <br />
                    <h5>
                      Price:
                        <span className="text-danger">
                          {" "}
                          $ {postdata.product_cost}
                        </span>
                   
                     
                    </h5>
                    <h5 className="mt-2">
                      Color:{color}
                    </h5><br/>
                    <div className="row">
                    
                   <div className="pt-3 pl-3">
                   <h4 className="d-inline mb-3">Share <i className="fa fa-share-alt"></i></h4>
                    <div className="row  mt-4" style={{marginLeft:'100px'}}>
                  
                        <div className="col-lg-3 col-md-3">
                          <FacebookShareButton
                            url="https://www.amazon.in/"
                            title={"Checkout " + postdata.product_name}
                            hashtag="#react"
                          >
                            <FacebookIcon
                              logofillColor="white"
                              round={true}
                            ></FacebookIcon>
                          </FacebookShareButton>
                        </div>
                        <div className="col-lg-3 col-md-3">
                          <WhatsappShareButton
                            url="https://www.amazon.in/"
                            title={"Checkout " + postdata.product_name}
                            hashtag="#react"
                          >
                            <WhatsappIcon
                              logofillColor="white"
                              round={true}
                            ></WhatsappIcon>
                          </WhatsappShareButton>
                        </div>
                        <div className="col-lg-3 col-md-3">
                          <TwitterShareButton
                            url="https://www.amazon.in/"
                            title={"Checkout " + postdata.product_name}
                            hashtag="#react"
                          >
                            <TwitterIcon
                              logofillColor="white"
                              round={true}
                            ></TwitterIcon>
                          </TwitterShareButton>
                        </div>
                      </div>
                      </div>
                      <div className="pt-2 ml-3 mt-5">
                    <button className="btn btn-danger text-uppercase m-3" onClick={()=>handleCart(state.id)}>Add To Cart</button>
                    <button className="btn btn-info text-uppercase m-3" onClick={rateproduct}>Rate Product</button>
                {ischange&&<Form>
                    <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Rate the product
                </Form.Label>
                <Col sm="10">
                <Form.Control  type="Number" placeholder="Enter Rate in number" name="rate" onChange={(e)=>{setRate(e.target.value)}}/>
                {rate!=='' && rate.value >5 && <span className="text-danger">Enter rating 1 to 5</span>}
                </Col>
            </Form.Group>
            <button className="btn btn-info text-uppercase ml-3" onClick={addrate}> Add Rate Product</button>
            </Form>}
            
                    </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      {images.map((item) => (
                         <button
                          className="btn img-fluid"
                          width="100px"
                          height="400px"
                          onClick={() => setmainimage(item)}
                        >
                          {" "}
                          <img
                            src={`${MAIN_URL}${postdata.category_id}/${item}`}
                            width="100px"
                            height="100px"
                             />
                        </button> 
                      ))}
                    </div>
                   
               
                  </div>
                </div>
               
                <Tabs defaultActiveKey="details" className="mb-3 mt-3">
  <Tab eventKey="details" title="Details">
  <ul className="list-unstyled text-start">
                    <li>Product Name: {postdata.product_name}</li>
                    <li>Dimension: {postdata.product_dimension}</li>
                    <li>Material: {postdata.product_material}</li>
                    <li>Producer: {postdata.product_producer}</li>
                    <li>Number of Stock: {postdata.product_stock}</li>
                    <li>Marketed by: Neostore</li>
                  </ul>
  </Tab>
  <Tab eventKey="description" title="Description">
  <p>{postdata.product_desc}</p>
  </Tab>
</Tabs>
                
              
              </div>
            </div>
            <hr />
          </div>
        </div>
        <br />
        <br />
      
                    
 </div>
  );
}

