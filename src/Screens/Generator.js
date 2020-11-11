import React, { useState } from "react";
import domtoimage from "dom-to-image";
import "../Styles/Generator.css";

const Generator = ({ meme, changeMeme }) => {
  const [memeText, editText] = useState(["Enter Text", "Add Bottom Text"]);

  const loadMemes = () => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) =>
        changeMeme(response.data.memes[Math.floor(Math.random() * 100)])
      )
      .then(() => {
        dragEvents();
      });
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

  const dragEvents = () => {
    const firstText = document.querySelectorAll(".memeText")[0];
    const secondText = document.querySelectorAll(".memeText")[1];
    dragElement(firstText);
    dragElement(secondText);
  };

  const dragElement = (elmnt) => {
    const clicker = (e) => {
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    const elementDrag = (e) => {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    };

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    elmnt.onmousedown = clicker;
  };

  const reset = () => {
    changeMeme(null);
  };

  const download = () => {
    domtoimage
      .toJpeg(
        document.querySelector(".card-body"),
        { quality: 0.95 },
        { height: meme.height < 450 ? meme.height : 450 },
        { width: meme.width < 750 ? meme.width : 750 }
      )
      .then(function (dataUrl) {
        let link = document.createElement("a");
        link.download = "my-meme.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div className="App">
      <div className="templateContainer">
        <p className="memeText">{memeText[0]}</p>
        <p className="memeText" id="textBottom">
          {memeText[1]}
        </p>
        <img id="memePic" src={meme.url} unselectable="on" />
      </div>
      <div className="card-body">
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
