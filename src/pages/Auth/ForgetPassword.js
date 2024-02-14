import React, {useRef,useState} from 'react';
import {Link,  useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import "../../styles/AuthStyles.css";
import Layout from '../../components/layout/Layout';

function ForgotPassword(){
        const emailRef = useRef();
        const navigate = useNavigate();
        
        const sendOtp = async () =>{
            
        try {
            const url = 'http://olfactors.onrender.com/api/vl/auth/otp-send';
            const options = {
            method: 'POST',
            url: url,
            headers: {  
            },
            };

            const response = await axios(options);
            console.log(response);

            if (response.data.statusText === 'Success') {
            toast.success('Login Successfully');
            localStorage.setItem('token', response.data.token);
            navigate('/'); 
            } else {
            toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong:', error);
        }
    }

    
    

    return(
        <Layout title={"Forgot Password - Ecommerce APP"}>
        <div className="register ">
          <form >
            <Toaster/>
            <h4 className="title">RESET PASSWORD</h4>
  
            <div className="mb-3">
              <input
                type="email"
                ref={emailRef}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email "
                autoComplete='off'
                required
              />
            </div>
            
  
            <button type="button" 
            className="btn btn-primary"
            onClick={sendOtp}
            >
              Send OTP
            </button>
            <Link to='/login'> <button type ='button' className="btn btn-primary">Back</button></Link>
          </form>
        </div>
      </Layout>
    );

};

export default ForgotPassword;