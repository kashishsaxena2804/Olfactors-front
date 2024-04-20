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
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/vl/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      setError(error.message);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/vl/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <div className="row product-details-container ">
        <div className="product-img col-md-6">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/api/vl/product/product-photo/${product._id}`}
            className="product-img1"
            alt={product.name}
            height="450"
            width="500px"
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h4 className="product-name1">{product.name}</h4>
          <h5>Description : {product.description}</h5>
          <h5>
            
            {product?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </h5>
          <h6>Category : {product?.category?.name}</h6>
          <button
            className="button add-to-cart-button"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products</h4>
        {error && <p className="text-center">Error: {error}</p>}
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="product-card" >
            <img
              src={`${process.env.REACT_APP_BASE_URL}/api/vl/product/product-photo/${p._id}`}
              className="card-img-top"
              onClick={() => {
                navigate(`/product/${p.slug}`);
                scrollToTop(); // Assuming scrollToTop is a function defined elsewhere
              }}
              alt={p.name}
            />

          <div className="product-details">
            <h3 className="product-name">{p.name}</h3>
            {/*<p className="product-offer">{p.offer}</p>*/}
            <div className="product-prices">
              {/*<span className="original-price">500</span>*/}
              <span className="discounted-price">{p.price.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}</span>
            </div>
            <button className="button add-to-cart-button" onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}>Add To Cart</button>
            
          </div>
        </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
