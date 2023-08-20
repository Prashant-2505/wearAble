import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './page/home/Home';
import Register from './page/auth/Register';
import Login from './page/auth/Login';
import Profile from './page/user/profile/Profile';
import ForgetPassword from './page/auth/ForgetPassword';
import Private from './privateRoute/PrivateRoute';
import CreateCategory from './page/admin/category/CreateCategory';
import PrivateRoute from './privateRoute/PrivateAdminRoute';
import AdminDasbaord from './page/admin/AdminDashbaord'
import CreateProduct from './page/admin/CreatePRoduct/CreateProduct';
import Product from './page/admin/product/Product';
import SingleProduct from './page/admin/singleProduct/SingleProduct';
import ProductDetail from './page/user/product/Product.Detail';

function App() {
  return (
    <>

      <BrowserRouter>

        <Routes>

          {/* users route */}

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<Private />} >
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/forget-password" element={<ForgetPassword />} />

          <Route path="/products" element={<Product isAdmin={false}  byCategory={false} />} />

          <Route path="/products/:id" element={<Product isAdmin={false} byCategory={true} />} />




          <Route path="/product/:slug" element={<ProductDetail />} />




          {/* // admin route */}
          <Route path="/admin-dashboard" element={<PrivateRoute />}>
            <Route index element={<AdminDasbaord />} />
          </Route>


          <Route path="/create-category" element={<PrivateRoute />}>
            <Route path="/create-category" element={<CreateCategory />} />
          </Route>

          <Route path="/create-product" element={<PrivateRoute />}>
            <Route path="/create-product" element={<CreateProduct />} />
          </Route>


          <Route path="/admin/products" element={<PrivateRoute />}>
            <Route path="/admin/products" element={<Product isAdmin={true}  byCategory={false}/>} />
          </Route>


          <Route path="/admin/product/:slug" element={<PrivateRoute />}>
            <Route path="/admin/product/:slug" element={<SingleProduct />} />
          </Route>


        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
