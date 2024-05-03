import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "../../styles/AuthStyles.css";
import Layout from "../../components/layout/Layout";

function ForgotPassword() {
  const emailRef = useRef();
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      if (!emailRef.current.value) {
        return toast.error("Email is required");
      }
      const response = await axios.post("/api/vl/auth/forget-password", {
        email: emailRef.current.value,
      });
      if (response.data.success) {
        toast.success("OTP sent successfully");
        setTimeout(() => {
          navigate("/reset-password", { state: { email: emailRef.current.value } });
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong:", error);
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div className="register ">
        <form>
          <Toaster />
          <h4 className="title">Enter your email</h4>

          <div className="mb-3">
            <input
              type="email"
              ref={emailRef}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email "
              autoComplete="off"
              required
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={sendOtp}>
            Send OTP
          </button>
          <Link to="/login">
            {" "}
            <button type="button" className="btn btn-primary">
              Back
            </button>
          </Link>
        </form>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
