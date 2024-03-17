import React,{useState, useEffect} from 'react'
import Layout from '../components/layout/Layout.js';
import axios from 'axios';
import {Checkbox, Radio} from 'antd';
import { Prices } from '../components/Prices.js';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart.js';
import toast from 'react-hot-toast';
import Carousel from 'react-bootstrap/Carousel';

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked,setChecked] = useState([])
  const [radio,setRadio] = useState([])
  const [total,setTotal] = useState(0)
  const [page,setPage] = useState(1)
  const [loading, setLoading]=useState(false)
  

  
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

  return (
    
    <Layout title={"All Products-Best offers"}>
      <div>
    <Carousel>
    <Carousel.Item>
      <img style={{height:'90vh'}}
        className="d-block w-100"
        src={"./images/banner.jpeg"}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img style={{height:'90vh'}}
        className="d-block w-100"
        src={"./images/banner.jpeg"}
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img style={{height:'90vh'}}
        className="d-block w-100"
        src={"./images/banner.jpeg"}
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

      <div className='row mt-3'>
        {/*<div className='col-md-2'>
          <h4 className='text-center'>Category</h4>
          <div className='d-flex flex-column'>
            {categories?.map(c=>(
              <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked,c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          price-filter
          <h4 className='text-center mt-4'>Price</h4>
          <div className='d-flex flex-column'>
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p=>(
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
                
              ))}
            </Radio.Group>
          </div>
          <div className='d-flex flex-column'>
            <button className='button btn btn-primary' onClick={()=> window.location.reload()}>
              Reset Filter
            </button>
          </div>
        </div>*/}
        <div>
          
        <h1 className='text-center'>Olfactors - Where fragrance becomes a Signature</h1>
        <div className='Product-container'>
          <div className='prod-heading'>
            <div><h2>Products</h2></div>
            <div><button className='button btn btn-primary ms-1'
                    onClick={() => navigate(`/product/`)}
                    >View More</button>
            </div>
          </div>
          <div className='main-card'>
            
            <div className="product-card">
              <img src={"./images/banner.jpeg"} className="product-image" alt=""/>
              <div className="product-details">
                <h3 className="product-name">Perfume</h3>
                {/*<p className="product-offer">{p.offer}</p>*/}
                <div className="product-prices">
                  {/*<span className="original-price">500</span>*/}
                  <span className="discounted-price">500</span>
                </div>
                <button className="button add-to-cart-button">Add To Cart</button>
                
              </div>
            </div>
            <div className="product-card">
              <img src={"./images/banner.jpeg"} className="product-image" alt=""/>
              <div className="product-details">
                <h3 className="product-name">Perfume</h3>
                {/*<p className="product-offer">{p.offer}</p>*/}
                <div className="product-prices">
                  {/*<span className="original-price">500</span>*/}
                  <span className="discounted-price">500</span>
                </div>
                <button className="button add-to-cart-button">Add To Cart</button>
                
              </div>
            </div>
            <div className="product-card">
              <img src={"./images/banner.jpeg"} className="product-image" alt=""/>
              <div className="product-details">
                <h3 className="product-name">Perfume</h3>
                {/*<p className="product-offer">{p.offer}</p>*/}
                <div className="product-prices">
                  {/*<span className="original-price">500</span>*/}
                  <span className="discounted-price">500</span>
                </div>
                <button className="button add-to-cart-button">Add To Cart</button>
                
              </div>
            </div>
            <div className="product-card">
              <img src={"./images/banner.jpeg"} className="product-image" alt=""/>
              <div className="product-details">
                <h3 className="product-name">Perfume</h3>
                {/*<p className="product-offer">{p.offer}</p>*/}
                <div className="product-prices">
                  {/*<span className="original-price">500</span>*/}
                  <span className="discounted-price">500</span>
                </div>
                <button className="button add-to-cart-button">Add To Cart</button>
                
              </div>
            </div>
          
          </div>
        </div>
        
        <div className='main-card1'>
          <h2 className='heading-text'>Categories</h2>
          <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card">
                <Link to={`/category/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
        {/*<div className='d-flex flex-wrap'>
          {products?.map((p) => (
              
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/api/vl/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <p className="card-text">₹{p.price}</p>
                    <button className='button btn btn-primary ms-1'
                    onClick={() => navigate(`/product/${p.slug}`)}
                    >More Details</button>
                    <button className='button btn btn-primary ms-1'
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >Add to Cart</button>
                  </div>
                </div>
              
            ))}
          </div>
          <div className='m-1 p-3'>
            {products && products.length <total &&(
              <button className='button btn btn-primary'
              onClick={(e)=>{
                e.preventDefault();
                setPage(page + 1);
              }}
              >
                
                {loading ?"loading...":"Load more"}
              </button>
            )}
          </div>*/}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage; 
