import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const { onSubmit } = props;
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email: values.email, password: values.password });
  };

  return (
    <div className="form__wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Log in</h2>
        <input
          className="form__input"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={values.email || ''}
          required
        />
        <input
          className="form__input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={values.password || ''}
          required
        />
        <button className="form__submit" type="submit">
          Log in
        </button>
      </form>
      <Link to="/signup" className="form__link">
        Not a member yet? Sign up here!
      </Link>
    </div>
  );
};

export default Login;
