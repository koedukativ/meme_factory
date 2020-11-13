import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import domtoimage from "dom-to-image-more";
import "../Styles/Generator.css";

// Generator section => responsive
// Upload own images
// Design
// Bugs: see repo
// Change font size
// Two columns for Meme Generator; change responsively

const Generator = ({ meme, changeMeme }) => {
  const [memeText, editText] = useState([]);
  const [textStyle, changeTextStyle] = useState({
    fontSize: 30,
  });
  const nodeRef = React.useRef(null);

  // Upon a template change, the input fields are reset and re-aligned to the new template
  useEffect(() => {
    editText([
      { text: "Enter Text", position: { x: 0, y: -150 } },
      { text: "Add More Text", position: { x: 0, y: 150 } },
    ]);

    document
      .querySelectorAll(".textInput")
      .forEach((input) => (input.value = ""));
  }, [meme]);

  // Loads a random meme from imgflip
  const loadMemes = () => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) =>
        changeMeme(response.data.memes[Math.floor(Math.random() * 100)])
      );
  };

  // Takes input number and edits the corresponding text
  const changeText = (num) => {
    const textCopy = [...memeText];
    textCopy[num].text = document.querySelectorAll("input")[num + 1].value;
    editText(textCopy);
  };

  // Drag Handler for Draggable. Saves all text positions
  const handleDrag = (event, position, index) => {
    let textCopy = [...memeText];
    const { x, y } = position;
    textCopy[index].position = { x: x, y: y };
    editText(textCopy);
  };

  const addText = () => {
    if (memeText.length < 8) {
      const textCopy = [...memeText];
      textCopy.push({ text: "More Text", position: { x: 0, y: 0 } });
      editText(textCopy);
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

  // Uses domtoimage to download the .memeDownload <div>
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
          }}
        >
          {memeText
            ? memeText.map((element, index) => (
                <Draggable
                  key={index}
                  bounds="parent"
                  nodeRef={nodeRef}
                  position={memeText[index].position}
                  onDrag={(e, position) => handleDrag(e, position, index)}
                >
                  <p className="memeText" ref={nodeRef} style={textStyle}>
                    {element.text}
                  </p>
                </Draggable>
              ))
            : null}

          <img id="memePic" src={meme.url} unselectable="on" />
        </div>
      </div>
      <div className="options">
        <div className="buttons">
          <button className="button is-primary" onClick={loadMemes}>
            Load Random Meme
          </button>
          <button className="button is-warning" onClick={reset}>
            Close Editior
          </button>
          <button className="button is-link" onClick={addText}>
            Add Text
          </button>
          <button className="button is-success" onClick={download}>
            Download
          </button>
          <input
            className="button"
            onChange={addMeme}
            type="file"
            multiple
          ></input>
        </div>
        <div className="inputFields">
          {memeText
            ? memeText.map((element, index) => (
                <input
                  className="textInput"
                  key={index}
                  placeholder="Enter Text"
                  onChange={() => {
                    changeText(index);
                  }}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Generator;
