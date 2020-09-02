import React, { useState } from 'react';
import './App.css';

function App() {

  const [meme, changeMeme] = useState();
  const [memeText, editText] = useState(["mememe", "youyuuy"]);

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


  
  
  

  
  
  

  return (
    <div className="App">
      {meme ? 
        <div className="memeContainer">
          <p className="memeText">{memeText[0]}</p>
          <p className="memeText" id="textBottom">{memeText[1]}</p>
          <img id="memePic" src={meme.url}/>
        </div>
      : 
      null
      }
      <input onChange={() => {changeText(0)}}></input>
      <input onChange={() => {changeText(1)}}></input>
      <button onClick={loadMemes}>Load fresh meme!</button>
      <input onChange={addMeme} type="file" id="input" multiple></input>
    </div>
  );
}

export default App;
