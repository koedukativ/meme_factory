import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import domtoimage from "dom-to-image-more";
import "../Styles/Generator.css";

const Generator = ({ meme, changeMeme, loadMeme }) => {
  const [memeText, editText] = useState([]);
  const [textStyle, changeTextStyle] = useState({
    fontSize: 30,
  });
  const nodeRef = React.useRef(null);

  // Upon a template change, the input fields are reset and re-aligned to the new template
  useEffect(() => {
    editText([]);

    document
      .querySelectorAll(".textInput")
      .forEach((input) => (input.value = ""));
  }, [meme]);

  // Takes input number and edits the corresponding text
  const changeText = (num) => {
    const textCopy = [...memeText];
    textCopy[num].text = document.querySelectorAll("input")[num].value;
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
      textCopy.push({ text: "Enter Text", position: { x: 0, y: 0 } });
      editText(textCopy);
    }
  };

  const addMeme = () => {
    const newMeme = {};
    newMeme.url = URL.createObjectURL(
      document.querySelector(".fileInput").files[0]
    );
    changeMeme(newMeme);
  };

  const changeSize = (increase) => {
    let textStyleCopy = { ...textStyle };
    textStyleCopy.fontSize += increase;
    if (textStyleCopy.fontSize > 10 && textStyleCopy.fontSize < 46) {
      changeTextStyle(textStyleCopy);
    }
  };

  const reset = () => {
    changeMeme(null);
  };

  // Uses domtoimage to download the .memeDownload <div>
  const download = () => {
    domtoimage
      .toPng(document.querySelector(".memeDownload"), { quality: 1.0 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-meme.png";
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <section className="section">
      <div className="topContainer">
        <div className="box">
          <div className="templateContainer">
            <div className="table">
              <div className="memeDownload">
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
                <img
                  id="memePic"
                  src={meme.url}
                  alt={`${meme.name} Meme ${meme.height} ${meme.width}`}
                  unselectable="on"
                />
              </div>
            </div>
          </div>
          <div className="options">
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
            <div className="buttonsList">
              <button className="button is-primary" onClick={loadMeme}>
                Load Random Meme
              </button>
              <button className="button is-link" onClick={addText}>
                Add Text
              </button>
              <button className="button is-success" onClick={download}>
                Download
              </button>
              <button className="button is-warning" onClick={reset}>
                Close Editior
              </button>
              <label for="file-upload" class="button is-link">
                Upload Own Image
              </label>
              <input
                id="file-upload"
                className="fileInput"
                onChange={addMeme}
                type="file"
                multiple
              />

              <button className="button is-info" onClick={() => changeSize(-2)}>
                <span className="icon is-small">
                  <i className="fas fa-heading">a</i>
                </span>
              </button>
              <button className="button is-info" onClick={() => changeSize(2)}>
                <span className="icon">
                  <i className="fas fa-heading fa-lg">A</i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Generator;
