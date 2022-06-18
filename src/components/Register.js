import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
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
            <form className="form" onSubmit={handleSubmit} >
                <h2 className="form__title">Sign Up</h2>
                <input
                    className="form__input"
                    name="email" type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={values.email || ""}
                    required
                />
                <input
                    className="form__input"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={values.password || ""}
                    required />

                <button className="form__submit" type="submit">Sign Up</button>
            </form>
            <Link to="/signin" className="form__link">Already a member? Log in here!</Link>
        </div>
    )
}

export default Register;