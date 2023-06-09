import "./forms.css"
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from "../validations/loginValidation";

const Login = () => {

  const { onLoginSubmit, onFormClose, errorLogin, removeErrorRegister} = useAuthContext();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  removeErrorRegister()
  const submitForm = (data) => {
    onLoginSubmit(data);
  }

  return (
    <section id="login-page" className="login">
      <form id="login-form" className="login__form" onSubmit={handleSubmit(submitForm)}>
        <fieldset>
          <legend className="login__legend">Login Form</legend>
          <div className="login__field">
            <label className="login__label" htmlFor="email">Email:</label>
            <span className="input">
              <input
                placeholder="Email:"
                {...register("email")}
              />
            </span>
            {errors.email && <p className="login__errors">{errors.email.message}</p>}
          </div>
          <div className="login__field">
            <label className="login__label" htmlFor="password">Password:</label>
            <span className="input">
              <input
                type="password"
                placeholder="Password:"
                {...register("password")}
              />
            </span>
            {errors.password && <p className="login__errors">{errors.password.message}</p>}
          </div>
          {errorLogin ? <p className="login__errors">{errorLogin.message}</p> : null}
          <div className="login-buttons">
            <input className="button submit" type="submit" value="Sign in" />
            <button className="button close" type="button" onClick={onFormClose}>Close</button>
          </div>
          <div className="login__dontHaveProfile">
            <span>If you don't have profile <Link to="/register">click here</Link></span>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default Login;