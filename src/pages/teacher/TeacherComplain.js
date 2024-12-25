import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MarkdownIt from "markdown-it";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const TeacherComplain = () => {
  const API_KEY = "AIzaSyAMHeZ7h3q4MxGpmBvARcke8fOlNIoGvgQ";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [chatHistory, setChatHistory] = useState([
    { role: "user", message: "Hello" },
    { role: "model", message: "Hello Teacher! I'm NainBot, how can I assist you today?" }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  
  const markdownParser = new MarkdownIt();

  const handleSendMessage = async () => {
    if (!input.trim()) return; // Prevent sending empty messages
    setTyping(true);

    const chat = model.startChat({
      history: chatHistory.map((item) => ({
        role: item.role,
        parts: [{ text: item.message }]
      }))
    });

    setLoading(true);
    const result = await chat.sendMessage(input);
    const botResponse = result.response.text();

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { role: "user", message: input },
        { role: "model", message: botResponse }
      ]);
      setInput("");
      setLoading(false);
      setTyping(false);
    }, 1000); 
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents new line
      handleSendMessage(); // Calls send message function
    }
  };

  const handleCopy = (message) => {
    navigator.clipboard.writeText(message);
    alert("Code copied to clipboard!"); // Feedback to user
  };

  const renderMessage = (message) => {
    const tokens = markdownParser.parse(message, {});
    return tokens.map((token, index) => {
      if (token.type === "fence") {
        const language = token.info || "text";
        const code = token.content.trim();
        return (
          <div style={styles.codeTerminal} key={index}>
            <SyntaxHighlighter language={language} style={solarizedlight}>
              {code}
            </SyntaxHighlighter>
            <button style={styles.copyButton} onClick={() => handleCopy(code)}>
              Copy Code
            </button>
          </div>
        );
      }
      return (
        <div
          key={index}
          dangerouslySetInnerHTML={{ __html: markdownParser.render(token.content) }}
        />
      );
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Teacher Chatbot</h2>
      <div style={styles.chatBox}>
        {chatHistory.map((item, index) => (
          <div
            key={index}
            style={item.role === "user" ? styles.userMessage : styles.modelMessage}
          >
            {renderMessage(item.message)}
          </div>
        ))}
        {loading && <div style={styles.loadingIndicator}>Wait...</div>}
        {typing && <div style={styles.typingIndicator}>NainBot is typing...</div>}
        {input && !loading && (
          <div style={styles.userMessage}>
            <p style={styles.messageText}>{input}</p>
          </div>
        )}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.input}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};


  // these are the syles for the applciation (chat bot {here i would change the styles of the chatapp})
 const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#121212",
    padding: "0",
    boxSizing: "border-box",
  },
  header: {
    padding: "10px 0",
    color: "#cfd8dc",
    fontSize: "1.5em",
    fontWeight: "bold",
    textAlign: "center",
  },
  chatBox: {
    flex: 1, // Allows the chat box to take all available space
    overflowY: "auto",
    padding: "20px",
    backgroundColor: "#1c1c1c",
    borderRadius: "16px 16px 0 0",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
    margin: "0 auto",
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
  },
  userMessage: {
    alignSelf: "flex-end",
    margin: "10px 0",
    padding: "14px 18px",
    background: "linear-gradient(135deg, #00e676, #1db954)",
    color: "#fff",
    borderRadius: "20px 20px 0 20px",
    maxWidth: "75%",
    wordWrap: "break-word",
    boxShadow: "0 2px 12px rgba(0, 255, 128, 0.3)",
    animation: "floatIn 0.6s ease-out",
  },
  modelMessage: {
    alignSelf: "flex-start",
    margin: "10px 0",
    padding: "14px 18px",
    background: "linear-gradient(135deg, #42a5f5, #2196f3)",
    color: "#fff",
    borderRadius: "20px 20px 20px 0",
    maxWidth: "75%",
    wordWrap: "break-word",
    boxShadow: "0 2px 12px rgba(66, 165, 245, 0.3)",
    animation: "floatIn 0.6s ease-out",
  },
  inputContainer: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    backgroundColor: "#1a1a1a",
    boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.2)",
    boxSizing: "border-box",
    margin: "0 auto",
    position: "sticky", // Sticks to bottom when scrolling in the chat box
    bottom: 0,
  },
  input: {
    flexGrow: 1,
    padding: "12px 18px",
    borderRadius: "25px",
    border: "1px solid #42a5f5",
    backgroundColor: "#333",
    color: "#e0e0e0",
    fontSize: "1rem",
    outline: "none",
    transition: "box-shadow 0.2s, border 0.3s",
    "&:focus": {
      boxShadow: "0 0 8px rgba(66, 165, 245, 0.8)",
      border: "1px solid #1e88e5",
    },
  },
  loadingIndicator: {
    color: "#00e676",
    fontSize: "1.1rem",
    fontWeight: "bold",
    textAlign: "center",
    margin: "15px 0",
    animation: "pulse 1s infinite",
  },

  typingIndicator: {
    color: "#42a5f5",
    fontSize: "0.95rem",
    fontStyle: "italic",
    textAlign: "center",
    margin: "8px 0",
    padding: "5px 0",
    animation: "blink 1.2s infinite",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  copyCodeButton: {
    padding: "5px 10px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.85rem",
    color: "#333",
    transition: "background 0.3s, color 0.3s",
    marginTop: "5px",
    "&:hover": {
      backgroundColor: "#ddd",
      color: "#000",
    }, },
  button: {
    padding: "12px 20px",
    borderRadius: "25px",
    backgroundColor: "#00e676",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#00c853",
    },
  },
};

// Keyframe animations (if not already included)
const keyframes = `
@keyframes floatIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

  
  // Animation (Add this to your CSS or as inline keyframes for smooth fade-in effect)
 
export default TeacherComplain;
