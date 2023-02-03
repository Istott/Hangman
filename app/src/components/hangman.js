import React, { useState } from "react";
import getRandomWord from "./randomWord";

import "./hangman.css";

export default function Hangman() {
  const alphabetBtns = [
    {
      letter: "a",
      isGuessed: false
    },
    {
      letter: "b",
      isGuessed: false
    },
    {
      letter: "c",
      isGuessed: false
    },
    {
      letter: "d",
      isGuessed: false
    },
    {
      letter: "e",
      isGuessed: false
    },
    {
      letter: "f",
      isGuessed: false
    },
    {
      letter: "g",
      isGuessed: false
    },
    {
      letter: "h",
      isGuessed: false
    },
    {
      letter: "i",
      isGuessed: false
    },
    {
      letter: "j",
      isGuessed: false
    },
    {
      letter: "k",
      isGuessed: false
    },
    {
      letter: "l",
      isGuessed: false
    },
    {
      letter: "m",
      isGuessed: false
    },
    {
      letter: "n",
      isGuessed: false
    },
    {
      letter: "o",
      isGuessed: false
    },
    {
      letter: "p",
      isGuessed: false
    },
    {
      letter: "q",
      isGuessed: false
    },
    {
      letter: "r",
      isGuessed: false
    },
    {
      letter: "s",
      isGuessed: false
    },
    {
      letter: "t",
      isGuessed: false
    },
    {
      letter: "u",
      isGuessed: false
    },
    {
      letter: "v",
      isGuessed: false
    },
    {
      letter: "w",
      isGuessed: false
    },
    {
      letter: "x",
      isGuessed: false
    },
    {
      letter: "y",
      isGuessed: false
    },
    {
      letter: "z",
      isGuessed: false
    }
  ];
  const [letters, setLetters] = useState(alphabetBtns);
  const [hangmanWord, setHangmanWord] = useState("");
  const [hangmanLetters, setHangmanLetters] = useState([]);
  const [isCustomActive, setIsCustomActive] = useState(false);
  const [isGuessActive, setIsGuessActive] = useState(false);
  const [customWord, setCustomWord] = useState("");
  const [countToDie, setCountToDie] = useState(0);
  const [winningCount, setWinningCount] = useState(null);

  const handleCustomWord = () => {
    setHangmanWord(customWord);
    let arrWithLetters = [];
    for (let i = 0; i < customWord.length; i++) {
      arrWithLetters.push({
        id: Math.floor(Math.random() * 999999),
        letter: customWord[i],
        isGuessed: false
      });
    }
    setHangmanLetters(arrWithLetters);
    setLetters(alphabetBtns);
    setCountToDie(0);
    setWinningCount(null);
    setCustomWord("");
    setIsCustomActive(false);
  };

  const handleGuessWord = () => {
    if (customWord === hangmanWord) {
      setWinningCount(hangmanWord.length);
    } else {
      setCountToDie(6);
    }
    setIsGuessActive(false);
  };

  const handleRandomWord = async () => {
    const randomWord = await getRandomWord(4);
    setHangmanWord(randomWord);
    let arrWithLetters = [];
    for (let i = 0; i < randomWord.length; i++) {
      arrWithLetters.push({
        id: Math.floor(Math.random() * 999999),
        letter: randomWord[i],
        isGuessed: false
      });
    }
    setHangmanLetters(arrWithLetters);
    setLetters(alphabetBtns);
    setCountToDie(0);
    setWinningCount(null);
    setCustomWord("");
    setIsCustomActive(false);
  };

  const handleGuessLetter = (letter) => {
    const newLetterArr = letters.map((ltr) => {
      return ltr.letter === letter || ltr.isGuessed === true
        ? { letter: ltr.letter, isGuessed: true }
        : { letter: ltr.letter, isGuessed: false };
    });
    setLetters(newLetterArr);

    let wordArr = 0;
    if (hangmanWord.includes(letter)) {
      const updatedHangmanBools = hangmanLetters.map((hangmanLtr) => {
        if (hangmanLtr.letter === letter) wordArr += 1;
        return hangmanLtr.letter === letter || hangmanLtr.isGuessed === true
          ? { id: hangmanLtr.id, letter: hangmanLtr.letter, isGuessed: true }
          : { id: hangmanLtr.id, letter: hangmanLtr.letter, isGuessed: false };
      });
      setWinningCount((count) => count + wordArr);
      setHangmanLetters(updatedHangmanBools);
    } else {
      setCountToDie((count) => count + 1);
    }
  };

  return (
    <div>
        <div><img src="./img/hangman1.png" alt="hangman1"/><img src="./img/hangman2.png" alt="hangman2"/></div>
      {isCustomActive ? (
        <form type="submit">
          <input
            type="text"
            placeholder="type custom word"
            value={customWord}
            onChange={(e) => setCustomWord(e.target.value)}
          ></input>
          <button onClick={handleCustomWord}>save word</button>
        </form>
      ) : (
        <button
          style={{ margin: "10px" }}
          onClick={() => setIsCustomActive(true)}
        >
          custom word
        </button>
      )}
      <button style={{ margin: "10px" }} onClick={handleRandomWord}>
        random word
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        {letters.map((letter) => {
          return (
            <button
            className="alphabetBtns"
              key={letter.letter}
              disabled={letter.isGuessed}
              onClick={() => handleGuessLetter(letter.letter)}
            >
              {letter.letter}
            </button>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "10px 0"
        }}
      >
        <p
          className={countToDie >= 1 ? "headCount" : ""}
          style={{
            display: "flex",
            border: "1px black solid",
            margin: "0 10px",
            padding: "5px"
          }}
        >
          HEAD
        </p>
        <p
          className={countToDie >= 2 ? "headCount" : ""}
          style={{
            display: "flex",
            border: "1px black solid",
            margin: "0 10px",
            padding: "5px"
          }}
        >
          BODY
        </p>
        <p
          className={countToDie >= 3 ? "headCount" : ""}
          style={{
            display: "flex",
            border: "1px black solid",
            margin: "0 10px",
            padding: "5px"
          }}
        >
          LEFT ARM
        </p>
        <p
          className={countToDie >= 4 ? "headCount" : ""}
          style={{
            display: "flex",
            border: "1px black solid",
            margin: "0 10px",
            padding: "5px"
          }}
        >
          RIGHT ARM
        </p>
        <p
          className={countToDie >= 5 ? "headCount" : ""}
          style={{
            display: "flex",
            border: "1px black solid",
            margin: "0 10px",
            padding: "5px"
          }}
        >
          LEFT LEG
        </p>
        <p
          className={countToDie >= 6 ? "headCount" : ""}
          style={{
            display: "flex",
            border: "1px black solid",
            margin: "0 10px",
            padding: "5px"
          }}
        >
          RIGHT LEG
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        {!hangmanWord ? (
          <p>Create a custom word to get started</p>
        ) : (
          hangmanLetters.map((letter) => {
            if (letter.letter === " ")
              return (
                <div
                  key={letter.id}
                  className={countToDie >= 6 ? "headCount" : ""}
                  style={{
                    borderBottom: "1px black solid",
                    minWidth: "50px",
                    minHeight: "50px",
                    color: "black"
                  }}
                ></div>
              );
            return (
              <div
                key={letter.id}
                className={countToDie >= 6 ? "headCount" : "headCountAlive"}
                style={{
                  border: "1px black solid",
                  minWidth: "50px",
                  minHeight: "50px",
                  color: "black"
                }}
              >
                <p
                  style={{ fontWeight: "bold" }}
                  className={
                    winningCount === hangmanWord.length ? "winner" : ""
                  }
                >
                  {letter.isGuessed ? letter.letter : "_"}
                </p>
              </div>
            );
          })
        )}
      </div>
      {isGuessActive ? (
        <form type="submit">
          <input
            type="text"
            placeholder="guess the word"
            value={customWord}
            onChange={(e) => setCustomWord(e.target.value)}
          ></input>
          <button style={{ margin: "10px" }} onClick={handleGuessWord}>
            submit guess
          </button>
        </form>
      ) : (
        <button
          style={{ margin: "10px" }}
          onClick={() => setIsGuessActive(true)}
        >
          guess entire word
        </button>
      )}

      {countToDie === 6 && (
        <h2 className={"headCount"}>
          You lost ma Dude! GAME OVER the word was {hangmanWord}
        </h2>
      )}
      {winningCount === hangmanWord.length && (
        <h2 style={{ color: "green" }}>You won ma dude!</h2>
      )}
    </div>
  );
}
