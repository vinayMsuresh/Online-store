import {MAIN_URL} from './Url';
import axios from 'axios';

let token = localStorage.getItem('_token');

export function registerUser(data){
    return axios.post(`${MAIN_URL}register`, data);
}
export function loginUser(data){
    return axios.post(`${MAIN_URL}login`, data);
}
export function socialLoginUser(data){
    return axios.post(`${MAIN_URL}sociallogin`, data);
}

export function forgotEmail(email){
    return axios.get(`${MAIN_URL}forgot/${email}`);
}

export function forgotChange(email,data){
    return axios.post(`${MAIN_URL}forgot/change/${email}`,data);
}
export function registerUser1(data){
    return axios.post(`${MAIN_URL}social`,data)
}
export function editData(data){
    return axios.put(`${MAIN_URL}editdata`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function addAddressto(data,email){
    return axios.post(`${MAIN_URL}addaddress/${email}`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function updpassword(data){
    return axios.post(`${MAIN_URL}changepassword`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function deletedata(data){
    return axios.delete(`${MAIN_URL}deleteadd`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function updaddress(data,email){
    return axios.put(`${MAIN_URL}updaddress/${email}`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function deleteddress(data,email){
    return axios.post(`${MAIN_URL}deleteaddress/${email}`,data,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function getProducts(){
    return axios.get(`${MAIN_URL}getdata`)
}
export function getAllCategories(){
    return axios.get(`${MAIN_URL}categories`)
}
export function getAllColors(){
    return axios.get(`${MAIN_URL}colors`)
}
export function getCategoryProducts(id){
    return axios.get(`${MAIN_URL}categoryproducts/${id}`)
}
export function getColorProducts(id){
    return axios.get(`${MAIN_URL}colorproducts/${id}`)
}
export function Postrate(data,id){
    return axios.post(`${MAIN_URL}addrate/${id}`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function getItem(id) {
    return axios.get(`${MAIN_URL}getproduct/${id}`);
}
export function addToCart(data){
    console.log(data);
    return axios.post(`${MAIN_URL}addcart`,data,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function getCart(email){
    return axios.get(`${MAIN_URL}getcart/${email}`,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function getOrder(email){
    return axios.get(`${MAIN_URL}getorder/${email}`,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function incproduct(data){
    return axios.put(`${MAIN_URL}incquantity`, data,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function decproduct(data){
    return axios.put(`${MAIN_URL}decquantity`, data,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function deleteOrder(id){
    return axios.delete(`${MAIN_URL}deleteorder/${id}`,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function checkout_order(data){
    return axios.put(`${MAIN_URL}checkout`,data,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function getOrd(id) {
    return axios.get(`${MAIN_URL}getorderbyid/${id}`);
}