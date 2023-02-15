import React from "react";
import Icon from "../Icon/Icon";

const InfoTooltip = React.memo((props) => {
  return (
    <div className={`infoTooltip ${props.isOpened && "infoTooltip_opened"}`}>
      <div className="infoTooltip__container">
        <Icon type={props.isSuccess ? "success" : "fail"} />
        <h2 className="infoTooltip__title">{props.text}</h2>
        <button
          onClick={props.onClose}
          className="button button_type_close"
          type="button"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  );
});

export default InfoTooltip;
