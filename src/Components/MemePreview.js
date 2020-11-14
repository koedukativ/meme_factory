import React from "react";
import "../Styles/Select.css";

const MemePreview = ({ element }) => {
  return <img src={element.url} alt={`${element.name} Meme`}></img>;
};

export default MemePreview;
