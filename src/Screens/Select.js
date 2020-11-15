import React, { useState, useEffect } from "react";
import "../Styles/Select.css";
import MemePreview from "../Components/MemePreview";
import Generator from "../Screens/Generator";

// Refactor display of 4 columns with less code

function Select() {
  const [memes, setMemes] = useState();
  const [template, setTemplate] = useState();

  const loadMemes = () => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        setMemes(response.data.memes);
      });
  };

  // Loads a random meme from imgflip
  const loadRandomMeme = () => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) =>
        setTemplate(response.data.memes[Math.floor(Math.random() * 100)])
      );
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
          <p className="title"> Choose a template! or</p>
          <button className="button is-primary" onClick={loadRandomMeme}>
            Load Random Meme
          </button>
        </section>
      )}
      <div className="columns is-multiline selectScreen">
        <div className="column is-full-mobile is-half-tablet is-one-quarter-desktop is-one-quarter-widescreen">
          {memes ? (
            memes.map((element, index) => {
              if (index > 24) {
              } else {
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
              }
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="column is-full-mobile is-half-tablet is-one-quarter-desktop is-one-quarter-widescreen">
          {memes ? (
            memes.map((element, index) => {
              if (index < 25 || index > 49) {
              } else {
                return (
                  <div className="box" key={index}>
                    <a
                      key={index}
                      href="#top"
                      onClick={() => {
                        setTemplate(element);
                      }}
                    >
                      <MemePreview element={element} />
                    </a>
                  </div>
                );
              }
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="column is-full-mobile is-half-tablet is-one-quarter-desktop is-one-quarter-widescreen">
          {memes ? (
            memes.map((element, index) => {
              if (index < 50 || index > 76) {
              } else {
                return (
                  <div className="box" key={index}>
                    <a
                      key={index}
                      href="#top"
                      onClick={() => {
                        setTemplate(element);
                      }}
                    >
                      <MemePreview element={element} />
                    </a>
                  </div>
                );
              }
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="column is-full-mobile is-half-tablet is-one-quarter-desktop is-one-quarter-widescreen">
          {memes ? (
            memes.map((element, index) => {
              if (index < 77) {
              } else {
                return (
                  <div className="box" key={index}>
                    <a
                      key={index}
                      href="#top"
                      onClick={() => {
                        setTemplate(element);
                      }}
                    >
                      <MemePreview element={element} />
                    </a>
                  </div>
                );
              }
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Select;
