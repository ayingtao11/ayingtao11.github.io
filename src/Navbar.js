import React from 'react';
//import { BrowserRouter, Route, Link } from "react-router-dom";
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'SimpleCalculator', href: '/simplecalculator' },
  { name: 'PEMDASCalculator', href: '/pemdascalculator' },
];

//this shows the navigation bar
function Navbar() {
  return (
    <nav className='nav'>
      <div className='background'>
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({
            isActive,
          }) => {
            return (
              (isActive
                ? 'active text' 
                : 'hover text')
            );
          }}
        >
          {item.name}
        </NavLink>
      ))}
    </div>
    </nav>
  );
}

export default Navbar;

/*
these two works the same:
<Link to="/calculator">Calculator</Link>
<a href="/calculator">Cal in href</a>


navbar in <ul> <li> <a> tags
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/blogs">Blogs</a>
        </li>
        <li>
          <a href="/calculator">Calculator</a>
        </li>
      </ul>
*/