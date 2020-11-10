import React from "react";
import "../Styles/Select.css";

function MemePreview(element) {
  return (
    <a href="#" onClick={() => console.log(element)}>
      <article className="memeContainer">
        <img src={element.element.url}></img>
      </article>
    </a>
  );
}

export default MemePreview;
