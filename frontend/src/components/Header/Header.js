import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import logo from "../../styles/images/logo-mesto.svg";
import { CurrentUserEmailContext } from "../../context/CurrentUserEmailContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Header = React.memo((props) => {
  const currentUserEmail = React.useContext(CurrentUserEmailContext);
  const [isEmailVisible, setIsEmailVisible] = React.useState(false);
  const { width } = useWindowDimensions();

  function handleClick() {
    setIsEmailVisible(!isEmailVisible);
  }

  function handleSignOut() {
    props.signOut();
    setIsEmailVisible(false);
  }

  return (
    <>
    {(width > 700 || (width < 700 && !props.loggedIn)) &&
      <header className="header">
        <Link className="header__link" to="/">
          <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        </Link>
        <div className="header__content">
          <p className="header__text">{currentUserEmail}</p>
          <Switch>
            <Route path="/sign-up">
              <Link className="header__link" to="/sign-in">Войти</Link>
            </Route>
            <Route path="/sign-in">
              <Link className="header__link" to="/sign-up">Регистрация</Link>
            </Route>
            <Route exact to="/">
              <Link className="header__link header__link_dim" to="sign-in" onClick={props.signOut}>Выйти</Link>
            </Route>
          </Switch>
        </div>
      </header>
    }

    {width <= 700 && props.loggedIn && isEmailVisible &&
      <div className="header__mobile">
        <p className="header__mobile-text">{currentUserEmail}</p>
        <Link className="header__mobile-link" to="sign-in" onClick={handleSignOut}>Выйти</Link>
      </div>
    }

    {width <= 700 && props.loggedIn &&
      <header className="header">
        <Link className="header__link" to="/">
          <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        </Link>
        <img
          className={isEmailVisible
            ? "header__icon-close"
            : "header__icon-group"}
          src={isEmailVisible
            ? require(`../../styles/images/btn-close.png`)
            : require(`../../styles/images/icon-group.png`)}
          onClick={handleClick}
          alt="Кнопка показа/скрытия части контента" />
      </header>
    }
    </>
  );
});

export default Header;
