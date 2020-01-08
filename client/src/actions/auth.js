import axios from 'axios';
import { REGISTER_SUCCESS , REGISTER_FAIL } from './types';
import { setAlert } from './alert';

//Register User

export const register = ({ name , email , password}) => async dispatch => {
 const config = {
   headers: {
     'Content-Type' : 'application/json'
   };

   const body = JSON.stringify({name , email , password});

   try {
    const res = axios.post('api/users',body,config) ;

    dispatch({type: REGISTER_SUCCESS , payload: res.data});
   } catch (error) {
     const errors = error.response.data.errors;

     if(errors){
       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
     }

    console.log("ERROR", error) ;

    dispatch({type: REGISTER_FAIL});
   }

 } 
}