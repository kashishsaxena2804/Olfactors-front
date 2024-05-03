import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgetPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Products from './pages/Admin/Products';
import Users from './pages/Admin/Users';
import AdminOrders from './pages/Admin/AdminOrders';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import Allproducts from './pages/Allproducts';
import Termsconditions from './pages/Terms&conditions';
import Privacypolicy from './pages/Privacypolicy';
import Shippingpolicy from './pages/Shippingpolicy';
import Refundreturnpolicy from './pages/Refund&returnpolicy';
import Satisfactionguarantee from './pages/Satisfactionguarantee';
import Disclaimer from './pages/Disclaimer';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/allproducts" element={<Allproducts/>} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/search" element={<Search />} />
      <Route path="/terms&conditions" element={<Termsconditions />} />
      <Route path="/privacypolicy" element={<Privacypolicy/>}/>
      <Route path="/shippingpolicy" element={<Shippingpolicy/>}/>
      <Route path="/refundreturnpolicy" element={<Refundreturnpolicy/>}/>
      <Route path="/satisfactionguarantee" element={<Satisfactionguarantee/>}/>
      <Route path="/disclaimer" element={<Disclaimer/>}/>
      <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders/>} />
          <Route path="user/profile" element={<Profile/>} />
        </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct/>} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
      <Route path='/register' element={<Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/*' element={<Pagenotfound/>}/>
    </Routes>
    </>
  );
}

export default App;
