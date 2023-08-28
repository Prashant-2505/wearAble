import React, { useEffect, useState } from 'react';
import './Header.css';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { Badge, notification } from 'antd';
import { useCart } from '../../context/cart';

const DropdownMenu = ({ title, options, hoveredMenu, setHoveredMenu }) => {
  const isMenuOpen = hoveredMenu === title;
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setHoveredMenu(isMenuOpen ? null : title);
  };

  const [cat, setCat] = useState('');

  return (
    <div onMouseEnter={handleMenuToggle} onMouseLeave={handleMenuToggle}>
      <button className='D-List'>
        <h3>{title}</h3>
        <AiOutlineArrowDown />
      </button>
      {isMenuOpen && (
        <div className='drop-div'>
          <ul>
            {options.map((option, index) => (
              <li key={index} className='drop-list' onClick={() => navigate(`/products/${option._id}`)}>
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [auth] = useAuth();

  const [cart] = useCart()

  const [value, setValue] = useState({ keyword: '' }); // Initialize value as an object with a 'keyword' property

  const curState = auth?.user?.role === 1 ? 'Admin' : auth?.user ? 'Profile' : 'Login';

  const redirect = () => {
    if (auth?.user) {
      if (auth.user.role === 1) {
        navigate('/admin-dashboard');
      } else {
        navigate('/profile');
      }
    } else {
      navigate('/login');
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v2/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while getting categories.',
      });
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      navigate(`/products/search/${value.keyword}`); // Use value.keyword for the search term
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='header'>
      <div className='brand'>
        <h2 onClick={() => navigate('/')} className='logo'>
          wearAble
        </h2>
      </div>
      <div className='header-left '>
        <ul className='list'>
          <li>
            <DropdownMenu
              title='Category'
              options={categories}
              hoveredMenu={hoveredMenu}
              setHoveredMenu={setHoveredMenu}
            />
          </li>
          <li>
            <form onSubmit={handleSubmit}>
              <input
                className='search'
                type="search"
                placeholder='Search'
                value={value.keyword}
                onChange={(e) => setValue({ ...value, keyword: e.target.value })}
              />
            </form>
          </li>
        </ul>
      </div>
      <div className='header-right'>
        <h3 onClick={redirect}>
          {curState}
        </h3>
        <Badge count={cart.length} showZero>
          <NavLink to="/cart">cart </NavLink>
        </Badge>
      </div>
    </div>
  );
};

export default Header;
