import React from 'react';
import logo from '../assets/logo.png';
import avataaar from '../assets/avataaar.png';

export default function Header() {
  return (
    <div className="c-header">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <img src={avataaar} alt="avataaar" />
      </div>
    </div>
  );
}
