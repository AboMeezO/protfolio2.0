import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const morseCode = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
};

const morseCodeToText = (morse) =>
  morse
    .split(" ")
    .map((code) => morseCode[code] || "")
    .join("");

const EasterEgg = ({ secretCode, mdFilePath }) => {
  const [input, setInput] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    fetch(mdFilePath)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load markdown file");
        return response.text();
      })
      .then((text) => setMarkdownContent(text))
      .catch((error) => console.error(error));
  }, [mdFilePath]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if (key !== "." && key !== "-" && key !== " ") return;

      setInput((previousInput) => {
        const newInput = previousInput + key;
        const morseMessage = morseCodeToText(newInput.trim());

        if (morseMessage.toUpperCase() === secretCode.toUpperCase()) {
          setShowCard(true);
        }

        return newInput;
      });
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [secretCode]);

  if (!showCard) return null;

  return (
    <div className="easter-egg-card">
      <div className="easter-egg-card__frame">
        <div className="cardContent">
          <button
            type="button"
            className="closeBtn"
            aria-label="Close hidden message"
            onClick={() => setShowCard(false)}
          >
            <span />
            <span />
          </button>
          <div className="easter-egg-card__content">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEgg;
