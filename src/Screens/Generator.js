import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import domtoimage from "dom-to-image-more";
import "../Styles/Generator.css";

const Generator = ({ meme, changeMeme }) => {
  const [memeText, editText] = useState(["Enter Text", "Add Bottom Text"]);

  const loadMemes = () => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) =>
        changeMeme(response.data.memes[Math.floor(Math.random() * 100)])
      );
  };

  const changeText = (num) => {
    const textCopy = [...memeText];
    textCopy[num] = document.querySelectorAll("input")[num].value;
    editText(textCopy);
    if (textCopy[num].length > 25) {
      document.querySelectorAll(".memeText")[num].style.fontSize = "20px";
    }
  };

  const addMeme = () => {
    const newMeme = {};
    newMeme.url = URL.createObjectURL(
      document.querySelector("#input").files[0]
    );
    changeMeme(newMeme);
  };

  const reset = () => {
    changeMeme(null);
  };

  const download = () => {
    domtoimage
      .toJpeg(document.querySelector(".memeDownload"), { quality: 1.0 })
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = "my-meme.jpg";
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div className="App">
      <div className="templateContainer">
        <div
          className="memeDownload"
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "0",
          }}
        >
          <Draggable bounds="parent">
            <p className="memeText">{memeText[0]}</p>
          </Draggable>
          <Draggable bounds="parent">
            <p className="memeText">{memeText[1]}</p>
          </Draggable>
          <img id="memePic" src={meme.url} unselectable="on" />
        </div>
      </div>
      <div className="inputFields">
        <input
          onChange={() => {
            changeText(0);
          }}
        ></input>
        <input
          onChange={() => {
            changeText(1);
          }}
        ></input>
      </div>
      <div className="buttons">
        <button className="button" onClick={loadMemes}>
          Load Random Meme
        </button>
        <button className="button" onClick={reset}>
          Close Editior
        </button>
        <button className="button" onClick={download}>
          Download
        </button>
        <input
          className="button"
          onChange={addMeme}
          type="file"
          multiple
        ></input>
      </div>
    </div>
  );
};

export default Generator;
