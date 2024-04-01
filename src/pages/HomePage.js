import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout.js";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.js";
import toast from "react-hot-toast";
import Carousel from "react-bootstrap/Carousel";
import ReactPlayer from "react-player";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [newarrival, setNewArrival] = useState([]);
  const [bestseller, setBestSeller] = useState([]);
  const [featured, setFeature] = useState([]);
  const [gifthamper, setGiftHamper] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/vl/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/vl/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTotal Count
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

  //filter by Cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/vl/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

//get new arrival
  const getNewArrival = async () => {
    try {
      const { data } = await axios.get("/api/vl/product/new-arrival");
      setNewArrival(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNewArrival();
  }, []);

  //get best seller
  const getBestSeller = async () => {
    try {
      const { data } = await axios.get("/api/vl/product/best-seller");
      setBestSeller(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBestSeller();
  }, []);

  //get feature product
  const getFeature = async () => {
    try {
      const { data } = await axios.get("/api/vl/product/featured-products");
      setFeature(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeature();
  }, []);

  //get gift hamper
  const getGiftHamper = async () => {
    try {
      const { data } = await axios.get("/api/vl/product/product-category/gift-hampers");
      setGiftHamper(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGiftHamper();
  }, []);

  return (
    <Layout title={"All Products-Best offers"}>
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              style={{ height: "90vh" }}
              className="d-block w-100"
              src={"./images/slider.jpg"}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "90vh" }}
              className="d-block w-100"
              src={"./images/slider.jpg"}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "90vh" }}
              className="d-block w-100"
              src={"./images/slider.jpg"}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <section className="image-container">
        <div className="image-item">
          <img src="./images/qual1.png" alt="Long Lasting" />
        </div>
        <div className="image-item">
          <img src="./images/qual2.png" alt="Paraben Free" />
        </div>
        <div className="image-item">
          <img src="./images/qual3.png" alt="Cruelty Free" />
        </div>
        <div className="image-item">
          <img src="./images/qual4.png" alt="Natural Ingredients" />
        </div>
        <div className="image-item">
          <img src="./images/qual5.png" alt="Steam Distillation" />
        </div>
        <div className="image-item">
          <img src="./images/qual6.png" alt="Best Quality Guarantee" />
        </div>
      </section>

      <div className="row mt-3">
        <div>
          <h1 className="text-center">
            Olfactors - Where fragrance becomes a Signature
          </h1>
          <div className="Product-container">
            <div className="prod-heading">
              <div>
                <h2>New Arrivals</h2>
              </div>
              <div>
                <button
                  className="button btn "
                  onClick={() => navigate(`/Allproducts`)}
                >
                  View More
                </button>
              </div>
            </div>
            <div className="main-card">
              
                {newarrival?.map((p) => (
                  <div className="product-card">
                  <div
                    className="product-card"
                    
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/api/vl/product/product-photo/${products._id}`}
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
                  </div>
                ))}
              
            </div>
          </div>
          <div className="Product-container">
            <div className="prod-heading">
              <div>
                <h2>Best Sellers</h2>
              </div>
              <div>
                <button
                  className="button btn btn-primary ms-1"
                  onClick={() => navigate(`/Allproducts`)}
                >
                  View More
                </button>
              </div>
            </div>
            <div className="main-card">
              
                {bestseller?.map((p) => (
                  <div className="product-card">
                  <div
                    className="product-card"
                    
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/api/vl/product/product-photo/${products._id}`}
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
                  </div>
                ))}
              
            </div>
          </div>

          <div className="main-card1">
            <h2 className="heading-text">Scent-Sational Discoveries</h2>
            <div className="row container">
              {categories.map((c) => (
                <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                  <div className="card">
                    <a href={`/category/${c.slug}`}>
                      <img src={c.image} alt="" />
                    </a>
                  </div>
                  <Link to={`/category/${c.slug}`} className="btn cat-btn">
                    {c.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="Product-container">
            <div className="prod-heading">
              <div>
                <h3>Feature Products</h3>
              </div>
              <div>
                <button
                  className="button btn btn-primary ms-1"
                  onClick={() => navigate(`/Allproducts`)}
                >
                  View More
                </button>
              </div>
            </div>
            <div className="main-card">
              
                {featured?.map((p) => (
                  <div className="product-card">
                  <div
                    className="product-card"
                    
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/api/vl/product/product-photo/${products._id}`}
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
                  </div>
                ))}
              
            </div>
          </div>

          <div className="Product-container">
            <div className="prod-heading">
              <div>
                <h2>Gift Hampers</h2>
              </div>
              <div>
                <button
                  className="button btn btn-primary ms-1"
                  onClick={() => navigate(`/category/gift-hampers`)}
                >
                  View More
                </button>
              </div>
            </div>
            <div className="main-card">
              
                {gifthamper?.map((p) => (
                  <div className="product-card">
                  <div
                    className="product-card"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/api/vl/product/product-photo/${products._id}`}
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
                  </div>
                ))}
              
            </div>
          </div>

          <div className="content">
            <div className="stat">
              <h4 className="section__stat-number">60+</h4>
              <h3>Premium Fragrances</h3>
            </div>
            <div className="stat">
              <h4 className="section__stat-number">5000+</h4>
              <h3>Happy Customers</h3>
            </div>
            <div className="stat">
              <h4 className="section__stat-number">4.9*</h4>
              <h3>Google Rating</h3>
            </div>
            <div className="stat">
              <h4 className="section__stat-number">6+</h4>
              <h3>Retail Stores</h3>
            </div>
          </div>
          <div class="main-container">
            <div class="main-card2">
              <div class="vdo-heading">
                <h2>Our Products</h2>
              </div>
              <div class="vdo-container">
                <ReactPlayer url="https://youtu.be/WhKJl9W_1Fw?si=3KwlBLx581JzwlZ4" />
              </div>
            </div>
            {/*<div class='main-card3'>
            <div class='vdo-heading'><h2>Reviews</h2></div>
            
                    </div>*/}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;