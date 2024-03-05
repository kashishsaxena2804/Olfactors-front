import React, { useRef } from "react";
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "../../styles/AuthStyles.css";
import Layout from "../../components/layout/Layout";

function ResetPassword() {
  const OTPRef = useRef();
  const PassRef = useRef();
  const ConfirmPassRef = useRef();
  const location = useLocation();
  const email = location.state.email;
  const navigate = useNavigate();

  const verifyOtp = async () => {
    try {
      if (!OTPRef.current.value) {
        return toast.error("OTP is required");
      }
      if (!PassRef.current.value) {
        return toast.error("Password is required");
      }
      if (PassRef.current.value !== ConfirmPassRef.current.value) {
        return toast.error("Password does not match");
      }
      const response = await axios.post("/api/vl/auth/change-password", {
        email: email,
        otp: OTPRef.current.value,
        password: PassRef.current.value,
      });
      if (response.data.success) {
        toast.success("Password reset successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong:", error);
    }
  };

  return (
    <Layout title={"Reset Password - Ecommerce APP"}>
      <div className="register">
        <form>
          <Toaster />
          <h4 className="title">Enter OTP and new password</h4>

          <div className="mb-3">
            <input
              type="number"
              ref={OTPRef}
              className="form-control"
              id="exampleInputOtp"
              placeholder="0000"
              autoComplete="off"
              maxLength={4}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              ref={PassRef}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="New Password"
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              ref={ConfirmPassRef}
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Confirm Password"
              autoComplete="off"
              required
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={verifyOtp}>
            Submit
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

export default ResetPassword;
