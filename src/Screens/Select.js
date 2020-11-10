import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../Styles/Select.css";
import MemePreview from "../Components/MemePreview";

function Select() {
  const [memes, setMemes] = useState();
  const loadMemes = () => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        setMemes(response.data.memes);
      });
  };

  useEffect(() => {
    loadMemes();
  }, []);

  return (
    <section className="selectScreen">
      {memes
        ? memes.map((element) => (
            <MemePreview
              element={element}
              onPress={() => console.log("test")}
            />
          ))
        : null}
    </section>
  );
}

export default Select;
