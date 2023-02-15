import React from "react";

const Login = React.memo((props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit} name={"login"}>
        <label htmlFor="email">
          <input
            className="login__input"
            onChange={handleEmailChange}
            value={email}
            name="email"
            type="email"
            placeholder="Email"
            id="email"
            required
          />
          <span className="email-input-error popup__error"></span>
        </label>
        <label htmlFor="password">
          <input
            className="login__input"
            onChange={handlePasswordChange}
            value={password}
            name="password"
            type="password"
            placeholder="Пароль"
            id="password"
            required
          />
          <span className="password-input-error popup__error"></span>
        </label>
        <button
          className="login__button"
          type="submit"
          aria-label="Войти"
        >
          Войти
        </button>
      </form>
    </div>
  );
});

export default Login;
