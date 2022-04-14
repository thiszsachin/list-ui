import React from "react";
import "../styles/popupView.css";

const PopupView = (props) => {
  const { detailsData, setDetailsData } = props;
  return (
    <div className={detailsData ? "popup-wrapper" : "popup-wrapper-close"}>
      <span className="popup-cancel" onClick={() => setDetailsData("")}>
        X
      </span>
      <div className="wrapper-content">
        <h3 className="list-heading">{props.detailsData.title}</h3>
        <p>Category : {detailsData.category}</p>
        <p>Matric Name : {detailsData.metric_name}</p>
        <p>Matric Start : {detailsData.metric_start}</p>
        <p>Matric Target : {detailsData.metric_target}</p>
      </div>
    </div>
  );
};

export default PopupView;
