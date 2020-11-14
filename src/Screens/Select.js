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

  useEffect(() => {
    loadMemes();
  }, []);

  return (
    <>
      <h1 className="title" id="top">
        Meme Machine
      </h1>
      {template ? (
        <Generator
          className="generator"
          meme={template}
          changeMeme={setTemplate}
        />
      ) : null}
      <div className="columns is-multiline selectScreen">
        <div className="column is-full-mobile is-half-tablet is-one-quarter-desktop is-one-quarter-widescreen">
          {memes ? (
            memes.map((element, index) => {
              if (index > 24) {
              } else {
                return (
                  <div className="box">
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
              if (index < 24 || index > 49) {
              } else {
                return (
                  <div className="box">
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
              if (index < 49 || index > 74) {
              } else {
                return (
                  <div className="box">
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
              if (index < 75) {
              } else {
                return (
                  <div className="box">
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
