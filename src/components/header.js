import React from 'react';
import logo from '../assets/logo.png';
import avataaar from '../assets/avataaar.png';
import { useHistory } from 'react-router-dom';

export default function Header() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/');
  };
  return (
    <div className="c-header">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <img src={avataaar} alt="avataaar" onClick={handleLogout} />
      </div>
    </div>
  );
}
