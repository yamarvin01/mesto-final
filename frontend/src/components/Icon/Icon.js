// Типы иконок: success, fail
import React from "react";

const Icon = React.memo((props) => {
  return (
    <img
      className="icon"
      src={require(`../../styles/images/icon-${props.type}.png`)}
      alt="Иконка"
    />
  );
});

export default Icon;
