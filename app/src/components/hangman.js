import React, { useEffect, useState } from "react";
import getRandomWord from "./randomWord";
import getRandom from "./getRandom";

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
  const [isVisible, setIsVisible] =  useState(false);
  const [dialogue, setDialogue] = useState('');
  const [width, setWidth] = useState('100%');
  const [hangmanCharacter, setHangmanCharacter] = useState('');

  useEffect(() => {
    if (winningCount === hangmanWord.length) setDialogue(getRandom("escaped"));
  }, [winningCount, hangmanWord.length])

  useEffect(() => {
    setTimeout(() => {
        setIsVisible(false);
      }, 3000);
  }, [letters]);

  const handleHangmanWord = async (word) => {
    const randomWord = await word;
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
    setWidth('100%');
    setHangmanCharacter(getRandom("hangmanCharacters"));
  }

  const handleGuessWord = () => {
    if (customWord === hangmanWord) {
      setWinningCount(hangmanWord.length);
    } else {
      setCountToDie(6);
      setWidth('0%');
    }
    setIsGuessActive(false);
    setCustomWord('');
  };

  const calcWidth = () => {
    if (countToDie === 5) return '0%';
    const num = Number(width.slice(0, -1));
    const secretSauce = 100/6;
    const str = Math.ceil(num - secretSauce);
    return str + '%';
  }

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
      setDialogue(getRandom('rightGuess'));
    } else {
      setCountToDie((count) => count + 1);
      setWidth(calcWidth());
      setDialogue(getRandom('wrongGuess'));
    }
    setIsVisible(true);
  };

  return (
    <div className="container">
        <div>
            <img className={winningCount === hangmanWord.length ? 'hangmanEscaped' : ''.concat(`clip${countToDie}`, ' hangmanPosition')} src={hangmanCharacter} alt="hangman"/>
            {winningCount !== hangmanWord.length
                ? <div className={isVisible ? "dialogueBox show" : "dialogueBox"}><p>{dialogue}</p></div>
                : <div className={winningCount === hangmanWord.length ? isVisible ?  "dialogueBoxEscaped show" : "dialogueBoxEscaped" : "dialogueBoxEscaped"}><p>{dialogue}</p></div>
            }
        </div>
        <div>
      {isCustomActive ? (
        <form type="submit">
          <input
            type="text"
            placeholder="type custom word"
            value={customWord}
            onChange={(e) => setCustomWord(e.target.value)}
          ></input>
          <button  onClick={() => handleHangmanWord(customWord?.toLowerCase())}>save word</button>
        </form>
      ) : (
        <button
          style={{ margin: "10px" }}
          onClick={() => setIsCustomActive(true)}
        >
          custom word
        </button>
      )}
      <button style={{ margin: "10px" }} onClick={() => handleHangmanWord(getRandomWord(4))}>
        random word
      </button>
      <button style={{ margin: "10px" }} onClick={() => handleHangmanWord(getRandom("commonWords"))} >
        common word
      </button>
      <div
        className="btnBox"
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
      <div className="healthBar">{countToDie === 6 ? 'dead' : ''}
        <div className="currentHealth" style={{width}}>{countToDie !== 6 ? width : ''}</div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        {!hangmanWord ? (
          <p>Create a custom word or do a random word to get started</p>
        ) : (
          hangmanLetters.map((letter) => {
            if (letter.letter === " ")
              return (
                <div
                  key={letter.id}
                  className={countToDie >= 6 ? "" : "winner"}
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
                className={countToDie >= 6 ? "" : "headCountAlive"}
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
        <h2 className={"clip6"}>
          You lost ma Dude! GAME OVER the word was {hangmanWord}
        </h2>
      )}
      {winningCount === hangmanWord.length && (
        <h2 style={{ color: "green" }}>You won ma dude!</h2>
      )}
      </div>
    </div>
  );
}
