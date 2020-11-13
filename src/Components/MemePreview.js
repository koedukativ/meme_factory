import React from "react";
import "../Styles/Select.css";

const MemePreview = (element) => {
  return <img src={element.element.url}></img>;
};

export default MemePreview;
