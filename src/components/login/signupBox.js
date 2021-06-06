import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { http } from '../../utility/http';
import { toast } from 'react-toastify';

export default function SignupBox() {
  const history = useHistory();
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    http({
      method: 'post',
      url: '/auth/signup',
      data: state,
    }).then(({ data }) => {
      if (data && data.status) {
        toast.success(data.message);
        history.push('/dashboard');
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <form onSubmit={handleSignup}>
      <h3>Register</h3>

      <div className="form-group">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block">
        Register
      </button>
      <Link to="/">
        <p className="forgot-password text-right">Already registered log in?</p>
      </Link>
    </form>
  );
}
