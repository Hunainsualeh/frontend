import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
    }, 1000); // Simulated delay for bot response
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

  const isCodeSnippet = (message) => {
    // Check if the message starts with a code language identifier
    const languageIndicators = ["```javascript", "```html", "```css", "```python", "```java", "```csharp"];
    return languageIndicators.some(lang => message.startsWith(lang)) && message.endsWith("```");
  };

  const formatCodeMessage = (message) => {
    // Extract the code from the message
    const code = message.slice(message.indexOf('\n') + 1, message.lastIndexOf('```')).trim();
    return code;
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
            {isCodeSnippet(item.message) ? (
              <div style={styles.codeTerminal}>
                <pre style={styles.codeText}>{formatCodeMessage(item.message)}</pre>
                <button style={styles.copyButton} onClick={() => handleCopy(formatCodeMessage(item.message))}>
                  Copy Code
                </button>
              </div>
            ) : (
              <p style={styles.messageText}>{item.message}</p>
            )}
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

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "#f0f0f0",
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
    color: "#333",
  },
  chatBox: {
    flexGrow: 1,
    width: "100%",
    maxWidth: "800px",
    height: "calc(100vh - 120px)",
    overflowY: "scroll",
    padding: "15px",
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
    margin: "0 auto",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
  },
  userMessage: {
    textAlign: "right",
    margin: "10px 0",
    padding: "10px 15px",
    background: "linear-gradient(135deg, #4caf50, #388e3c)",
    color: "#fff",
    borderRadius: "20px 20px 0 20px",
    maxWidth: "80%",
    wordWrap: "break-word",
    transition: "transform 0.2s",
    animation: "fadeIn 0.5s",
  },
  modelMessage: {
    textAlign: "left",
    margin: "10px 0",
    padding: "10px 15px",
    background: "linear-gradient(135deg, #2196F3, #1976D2)",
    color: "#fff",
    borderRadius: "20px 20px 20px 0",
    maxWidth: "80%",
    wordWrap: "break-word",
    transition: "transform 0.2s",
    animation: "fadeIn 0.5s",
  },
  messageText: {
    margin: "5px 0",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  codeTerminal: {
    backgroundColor: "#2e2e2e",
    padding: "15px",
    borderRadius: "8px",
    position: "relative",
    margin: "10px 0",
  },
  codeText: {
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    color: "#c8d0e0",
    margin: 0,
  },
  loadingIndicator: {
    color: "#00e676",
    textAlign: "center",
    margin: "10px 0",
    fontWeight: "bold",
  },
  typingIndicator: {
    color: "#ccc",
    fontStyle: "italic",
    textAlign: "center",
    margin: "10px 0",
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    backgroundColor: "#1e1e1e",
  },
  input: {
    flexGrow: 1,
    padding: "10px",
    borderRadius: "30px",
    border: "1px solid #4caf50",
    backgroundColor: "#303030",
    color: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    marginRight: "10px",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "30px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontWeight: "bold",
  },
  copyButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "3px",
  },
};

export default TeacherComplain;