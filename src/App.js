import React, { useState } from 'react';
import './App.css';

function App() {

  const [meme, changeMeme] = useState();
  const [memeText, editText] = useState(["mememe", "youyuuy"]);

  const loadMemes = () => {
    fetch('https://api.imgflip.com/get_memes')
    .then((response) => response.json())
    .then((response) => changeMeme(response.data.memes[Math.floor(Math.random() * 100)]));
  }
  
  const changeText = (num) => {
    const textCopy = [...memeText];
    textCopy[num] = document.querySelectorAll("input")[num].value;
    editText(textCopy);
  }


  return (
    <div className="App">
      {meme ? 
        <div className="memeContainer">
          <p className="memeText">{memeText[0]}</p>
          <p className="memeText" id="textBottom">{memeText[1]}</p>
          <img id="memePic" src={meme.url}/>
          <input onChange={() => {changeText(0)}}></input>
          <input onChange={() => {changeText(1)}}></input>
        </div>
      : 
      null
      }
      <button onClick={loadMemes}>Load fresh meme!</button>
    </div>
  );
}

export default App;
