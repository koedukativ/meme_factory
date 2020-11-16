import React, { useState, useEffect } from "react";
import "../Styles/Select.css";
import MemePreview from "../Components/MemePreview";
import Generator from "../Screens/Generator";

function Select() {
  const [memes, setMemes] = useState([]);
  const [template, setTemplate] = useState();

  const loadMemes = () => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const memeArray = [];
        memeArray[0] = response.data.memes.slice(0, 25);
        memeArray[1] = response.data.memes.slice(25, 50);
        memeArray[2] = response.data.memes.slice(50, 77);
        memeArray[3] = response.data.memes.slice(77, 100);
        console.log(memeArray);
        setMemes(memeArray);
      });
  };

  // Loads a random meme from imgflip
  const loadRandomMeme = () => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) =>
        setTemplate(response.data.memes[Math.floor(Math.random() * 100)])
      )
      .then(() => window.scroll({ top: 200, left: 0 }));
  };

  useEffect(() => {
    loadMemes();
  }, []);

  return (
    <>
      <h1 className="title font-effect-shadow-multiple" id="top">
        Meme Machine
      </h1>
      {template ? (
        <Generator
          className="generator"
          meme={template}
          changeMeme={setTemplate}
          loadMeme={loadRandomMeme}
        />
      ) : (
        <section className="title">
          <p className="title"> Choose a template or</p>
          <button className="button is-primary" onClick={loadRandomMeme}>
            Load Random Meme
          </button>
        </section>
      )}
      <div className="columns is-multiline selectScreen">
        {memes ? (
          memes.map((memeList, index) => {
            return (
              <div className="column is-full-mobile is-half-tablet is-one-quarter-desktop is-one-quarter-widescreen">
                {memeList.map((element, index) => {
                  return (
                    <div className="box" key={index}>
                      <a
                        href="#top"
                        onClick={() => {
                          setTemplate(element);
                        }}
                      >
                        <MemePreview element={element} />
                      </a>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Select;
