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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
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
    <Layout className="homepage" title={"Olfactors"}>
      <div className="slider-content">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block"
              src={"./images/slider.jpg"}
              alt="First slide"
            />
          
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src={"./images/slider2.jpg"}
              alt="Second slide"
            />

            
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src={"./images/slider3.png"}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src={"./images/slider4.jpg"}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
          <video
            className="d-block"
            autoPlay
            loop
            muted
          >
          <source src="./images/slider5.mp4" type="video/mp4" />
        </video>

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

      <div className="row mt-3 ">
        <div>
          <h1 className="text-center Main-heading">
            Olfactors - Where fragrance becomes a Signature
          </h1>
          <div className="Product-container">
              <div className="prod-heading">
                <div>
                  <h2  className="p-head">New Arrivals</h2>
                </div>
                <div>
                  <button
                    className="button btn view-more-button"
                    onClick={() => navigate(`/Allproducts`)}
                  >
                    View More
                  </button>
                </div>
              </div>
              <div className="main-card">
                {newarrival?.map((p) => (
                  <div className="product-card">
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
                      <div className="product-prices">
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
                          localStorage.setItem("cart", JSON.stringify([...cart, p]));
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


          <div className="Product-container">
            <div className="prod-heading">
              <div>
                <h2 className="p-head">Best Sellers</h2>
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

          <div className="cat-card">
            <h2 className="cat-heading">Scent-Sational Discoveries</h2>
            <div className="cat-container">
              {categories.map((c) => (
                <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                    <a href={`/category/${c.slug}`}>
                      <img className="card-image" src={`${process.env.REACT_APP_BASE_URL}/api/vl/category/category-photo/${c._id}`} alt="" />
                    </a>
                  <Link to={`/category/${c.slug}`} className="cat-btn">
                    {c.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="Product-container">
            <div className="prod-heading">
              <div>
                <h2 className="p-head">Feature Products</h2>
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

          <div className="Product-container">
            <div className="prod-heading">
              <div>
                <h2 className="p-head">Gift Hampers</h2>
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

          <div className="content1">
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

          {/*<div className="auto-slider">
            <div className="slide-track">
              <div className="slide-img">
                <img
                src={"./images/products/slide1.jpg"}
                alt=""
              />
              </div>
              <div className="slide-img">
                <img
                src={"./images/products/slide2.jpg"}
                alt=""
              />
              </div>
              <div className="slide-img">
                <img
                src={"./images/products/slide3.jpg"}
                alt=""
              />
              </div>
              <div className="slide-img">
                <img
                src={"./images/products/slide4.jpg"}
                alt=""
              />
              </div>
              <div className="slide-img">
                <img
                src={"./images/products/slide5.jpg"}
                alt=""
              />
              </div>
              <div className="slide-img">
                <img
                src={"./images/products/slide6.jpg"}
                alt=""
              />
              </div>
              <div className="slide-img">
                <img
                src={"./images/products/slide7.jpg"}
                alt=""
              />
              </div>
              <div className="slide-img">
                <img
                src={"./images/products/slide8.jpg"}
                alt=""
              />
              </div>
              <div className="slide-img">
                <img
                src={"./images/products/slide9.jpg"}
                alt=""
              />
              </div>
              <div className="slide-img">
                <img
                src={"./images/products/slide10.jpg"}
                alt=""
              />
              </div>              
            </div>
                      </div>*/}

              <div class="vdo-container-bottom">
              <video
            
            className="d-block "
            autoPlay
            loop
            muted
          >
          <source src="./images/ad-vdo.mp4" type="video/mp4" />
        </video>
              </div>
           
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;