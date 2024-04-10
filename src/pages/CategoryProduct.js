import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { Prices } from "../components/Prices";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/CategoryProductStyles.css";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/vl/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/vl/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/vl/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h2 className="text-center">Category - {category?.name}</h2>
        <h5 className="text-center">{products?.length} result found </h5>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="product-card" key={p._id} onClick={() => navigate(`/product/${p.slug}`)}>
                <img
                      src={`${process.env.REACT_APP_BASE_URL}/api/vl/product/product-photo/${p._id}`}
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
            <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
