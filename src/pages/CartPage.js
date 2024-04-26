import "../styles/CartStyles.css";
import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import useRazorpay from "react-razorpay";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [Razorpay, isLoaded] = useRazorpay();

  // Total price calculation
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price ?? 0;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
      return "Error calculating total price";
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/vl/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/vl/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="cart-heading">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center bg-light p-2 mb-1">
                <p className="text-center">
                  {cart?.length
                    ? `You Have ${cart.length} items in your cart ${
                        auth?.token ? "" : "please login to checkout !"
                      }`
                    : " Your Cart Is Empty"}
                </p>
              </h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="product-container">
                {cart?.map((p) => (
                  <div className="product-card" key={p._id}>
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/api/vl/product/product-photo/${p._id}`}
                      className="card-img-top"
                      onClick={() => navigate(`/product/${p.slug}`)}
                      alt={p.name}
                    />
                    <div className="product-details">
                      <h3 className="product-name">{p.name}</h3>
                      <div className="product-prices">
                        <span className="discounted-price">
                          {p.price?.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </span>
                      </div>
                      <div className="cart-remove-btn">
                        <button
                          className="button btn btn-danger"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                    <br />
                    <br />
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        if (!cart?.length) {
                          toast.error("Cart is empty");
                          return;
                        }
                        var products = cart.reduce((acc, current) => {
                          const existingProduct = acc.find(
                            (item) => item.productId === current._id
                          );
                          if (!existingProduct) {
                            acc.push({ productId: current._id, quantity: 1 });
                          } else {
                            existingProduct.quantity++;
                          }
                          return acc;
                        }, []);
                        var request_body = {
                          userId: auth.user._id,
                          products: products,
                        };
                        axios
                          .post("/api/vl/order/create", request_body)
                          .then((response) => {
                            if (response.status === 200) {
                              localStorage.removeItem("cart");
                              setCart([]);

                              var options = {
                                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                                amount: response.data.amount,
                                currency: response.data.currency,
                                name: "Olfactors",
                                description: "Olfactors Payment Page",
                                order_id: response.data.order_id,
                                handler: function (res) {
                                  console.log(res);
                                },
                                prefill: {
                                  name: auth.user.name,
                                  email: auth.user.email,
                                  contact: auth.user.phone,
                                },
                              };
                              var rzp1 = new Razorpay(options);
                              rzp1.on("payment.failed", function (response) {
                                alert(response.error.code);
                                alert(response.error.description);
                                alert(response.error.source);
                                alert(response.error.step);
                                alert(response.error.reason);
                                alert(response.error.metadata.order_id);
                                alert(response.error.metadata.payment_id);
                              });
                              rzp1.open();
                            } else {
                              toast.error("Something went wrong");
                            }
                          });
                      }}
                    >
                      Make Payment
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
