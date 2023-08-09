import React, { useEffect, useState } from 'react';
import './Header.css';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const DropdownMenu = ({ title, options, hoveredMenu, setHoveredMenu }) => {
  const isMenuOpen = hoveredMenu === title;

  const handleMenuToggle = () => {
    setHoveredMenu(isMenuOpen ? null : title);
  };

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
              <li key={index} className='drop-list'>
                {option}
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
  const navigate = useNavigate();
  const [auth] = useAuth();

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
              title='Men'
              options={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
              hoveredMenu={hoveredMenu}
              setHoveredMenu={setHoveredMenu}
            />
          </li>
          <li>
            <DropdownMenu
              title='Women'
              options={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
              hoveredMenu={hoveredMenu}
              setHoveredMenu={setHoveredMenu}
            />
          </li>
          <li>
            <DropdownMenu
              title='Child'
              options={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
              hoveredMenu={hoveredMenu}
              setHoveredMenu={setHoveredMenu}
            />
          </li>
          <li>
            <form action="">
              <input className='search' type="search" placeholder='search' />
            </form>
          </li>
        </ul>
      </div>
      <div className='header-right'>
        <h3 onClick={redirect}>
          {curState}
        </h3>
        <h3>Cart</h3>
      </div>
    </div>
  );
};

export default Header;
