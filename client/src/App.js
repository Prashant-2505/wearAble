import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './page/Home';
import Register from './page/auth/Register';
import Login from './page/auth/Login';
import Profile from './page/profile/Profile';
import ForgetPassword from './page/auth/ForgetPassword';
import Private from './privateRoute/PrivateRoute';
import CreateCategory from './page/admin/category/CreateCategory';
import PrivateRoute from './privateRoute/PrivateAdminRoute';
import AdminDasbaord from './page/admin/AdminDashbaord'

function App() {
  return (
    <>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<Private />} >
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/forget-password" element={<ForgetPassword />} />


           // admin route
          <Route path="/admin-dashboard" element={<PrivateRoute />}>
            <Route index element={<AdminDasbaord />} />
          </Route>

        

          <Route path="/create-category" element={<PrivateRoute />}>
            <Route path="/create-category" element={<CreateCategory />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
