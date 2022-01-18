import Header from './components/Header';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Login from './components/Login';
import Registration from './components/Registration';
import MapContainer from './components/MapContainer';
import ThanksPage from './components/ThanksPage';
import ForgotEmail from './components/ForgotEmail';
import ForgotPass from './components/ForgotPass';
import Header2 from './components/Header2';
import ChangePassword from './components/ChangePassword';
import EditProfile from './components/EditProfile';
import Editaddress from './components/Editaddress';
import Addaddress from './components/AddAddress';
import UserProfile from './components/UserProfile';
import Cart from './components/Cart';
import Product_Details from './components/Product_Details';
import Logo from './components/Logo';
import Order from './components/Order';
import SelectAddress from './components/SelectAddress';
import Checkout from './components/Checkout';
import Pdf from './components/Pdf';
import Products from './components/Products';
function App() {
  return (
    <div className="App">
      
      <Router>
      {localStorage.getItem('user') !== null?<Header2/>:<Header/>}
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path='/products' element={<Products/>}/>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/product_details" element={<Product_Details/>} />
          <Route path="/addlogo" element={<Logo/>}/>
          <Route path='/order' element={<Order/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/pdf' element={<Pdf/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path="/locateus" element={<MapContainer/>} />
          <Route path="/thanks" element={<ThanksPage/>} />
          <Route path="/forgot" element={<ForgotEmail/>} />
          <Route path="/forgotpass" element={<ForgotPass/>} />
          <Route path="/changepassword" element={<ChangePassword/>}/>
          <Route path="/userprofile" element={<UserProfile/>}/>
          <Route path="/addaddress" element={<Addaddress/>}/>
          <Route path="/editdata" element={<EditProfile/>}/>
          <Route path="/editaddress" element={<Editaddress/>}/>
          <Route path="/selectaddress" element={<SelectAddress/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
        </Routes>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
