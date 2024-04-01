import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart.js";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/vl/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/vl/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details mt-3">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/api/vl/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="500"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="button btn ">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products  </h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="product-card">
            
              <img
                src={`${process.env.REACT_APP_BASE_URL}/api/vl/product/product-photo/${product._id}`}
                className="card-img-top"
                onClick={() => navigate(`/product/${p.slug}`)}
                alt={p.name}
              />
              <div className="product-details">
                <h3 className="product-name">{p.name}</h3>
                {/*<p className="product-offer">{p.offer}</p>*/}
                <div className="product-prices">
                  {/*<span className="original-price">500</span>*/}
                  <span className="discounted-price">
                    {p.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                </div>
                <button
                  className="button add-to-cart-button"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  Add To Cart
                </button>
              </div>
            
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
