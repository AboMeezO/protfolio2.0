import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

// دالة لتحويل شيفرة مورس إلى نص
const MorseCodeToText = (morse) => {
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
  return morse
    .split(" ")
    .map((code) => morseCode[code] || "")
    .join("");
};

const EasterEgg = ({ secretCode, mdFilePath }) => {
  const [input, setInput] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");

  // تحميل المحتوى من ملف Markdown
  useEffect(() => {
    fetch(mdFilePath)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Failed to load markdown file");
        }
      })
      .then((text) => setMarkdownContent(text))
      .catch((error) => console.error(error));
  }, [mdFilePath]);

  // الاستماع لضغطات الكيبورد
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;

      // نسمح بكتابة نقاط وشرطات فقط (شيفرة مورس)
      if (key === "." || key === "-" || key === " ") {
        setInput((prevInput) => {
          const newInput = prevInput + key;

          // تحويل الشيفرة المدخلة إلى نص باستخدام MorseCodeToText
          const morseMessage = MorseCodeToText(newInput.trim());

          // مقارنة النص المحول مع الكود السري
          if (morseMessage.toUpperCase() === secretCode.toUpperCase()) {
            setShowCard(true); // عرض الـCard إذا كانت المدخلات تطابق الكود السري
          }
          return newInput;
        });
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [secretCode]);

  return (
    <>
      {showCard && (
        <div className="easter-egg-card" style={styles.card}>
          <div style={styles.cardContent}>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
            <button style={styles.closeBtn} onClick={() => setShowCard(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// أساليب تصميم الـCard
const styles = {
  card: {
    color: "black",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  cardContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "80%",
    maxHeight: "80%",
    overflowY: "auto",
    textAlign: "center",
  },
  closeBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default EasterEgg;
