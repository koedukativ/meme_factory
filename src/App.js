import React, { useState } from 'react';
import domtoimage from 'dom-to-image';
import './App.css';


function App() {

  const [meme, changeMeme] = useState();
  const [memeText, editText] = useState(["Enter Text", "Add Bottom Text"]);

  const loadMemes = () => {
    fetch('https://api.imgflip.com/get_memes')
    .then((response) => response.json())
    .then((response) => changeMeme(response.data.memes[Math.floor(Math.random() * 100)]))
    .then(() => {dragEvents()});
  }
  
  const changeText = (num) => {
    const textCopy = [...memeText];
    textCopy[num] = document.querySelectorAll("input")[num].value;
    editText(textCopy);
    if(textCopy[num].length > 25) {
      console.log("too big");
      document.querySelectorAll(".memeText")[num].style.fontSize = "20px";
      console.log(document.querySelectorAll(".memeText")[num]);
    }
  }

  const addMeme = () => {
    const newMeme = {};
    newMeme.url = URL.createObjectURL(document.querySelector("#input").files[0]);
    console.log(newMeme);
    changeMeme(newMeme);
  }

  const dragEvents = () => {
    const firstText = document.querySelectorAll(".memeText")[0];
    const secondText = document.querySelectorAll(".memeText")[1];
    dragElement(firstText);
    dragElement(secondText);
  }

  const dragElement = (elmnt) => {
    const clicker = (e) => {
      pos3 = e.clientX;
      pos4 = e.clientY;
      console.log(pos1 + " " + pos2 + " " + pos3 + " " + pos4);
      console.log(elmnt.offsetTop);
      console.log(elmnt.style.top);
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    }

    const elementDrag = (e) => {
      console.log(pos1 + " " + pos2 + " " + pos3 + " " + pos4);
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      console.log(pos1 + " " + pos2 + " " + pos3 + " " + pos4);
      console.log(elmnt.offsetTop);
      elmnt.style.top = (elmnt.offsetTop - pos2 - 30) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = clicker;
  }

  const reset = () => {
    changeMeme(null);
  }

  const download = () => {
    domtoimage.toJpeg(document.querySelector(".memeContainer"), {quality: 0.95}, {height: meme.height}, {width: meme.width})
    .then(function (dataUrl) {
      let link = document.createElement('a');
      link.download = 'my-meme.jpeg';
      link.href = dataUrl;
      link.click();
    });
  }

  return (
    <div className="App">
      {meme ? 
        <div className="memeContainer">
          <p className="memeText" >{memeText[0]}</p>
          <p className="memeText" id="textBottom">{memeText[1]}</p>
          <img id="memePic" src={meme.url} unselectable="on"/>
        </div>
      : 
      null
      }
      <div className="inputFields"> 
        <input onChange={() => {changeText(0)}}></input>
        <input onChange={() => {changeText(1)}}></input>
      </div>
      <div className="buttons">
        <button className="button" onClick={loadMemes}>Load fresh meme!</button>
        <button className="button" onClick={reset}>Reset</button>
        <button className="button" onClick={download}>Download</button>
        <input className="button" onChange={addMeme} type="file" multiple></input>
      </div>
    </div>
  );
}

export default App;
