import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { http } from '../../utility/http';
import { toast } from 'react-toastify';
export default function LoginBox() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    http({
      method: 'post',
      url: '/auth/signin',
      data: { email, password },
    }).then(({ data }) => {
      if (data && data.status) {
        toast.success(data.message);
        localStorage.setItem('user', JSON.stringify(data.data));
        history.push('/dashboard');
      } else {
        toast.error(data.message);
      }
    });
  };
  return (
    <form onSubmit={handleLogin}>
      <h3>Log in</h3>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block">
        Sign in
      </button>
      <p className="forgot-password text-right">
        <a href="/">Forgot password?</a>
      </p>
      <Link to="sign-up">
        <p className="signup-link">Create a new account</p>
      </Link>
    </form>
  );
}
