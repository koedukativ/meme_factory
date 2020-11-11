import React from "react";
import "../Styles/Select.css";
import { Link } from "react-router-dom";

const MemePreview = (element) => {
  return (
    <article className="memeContainer">
      <img src={element.element.url}></img>
    </article>
  );
};

export default MemePreview;
