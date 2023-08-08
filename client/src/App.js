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

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
