import React, { useState } from "react";
import axios from "axios";
import "../static/css/Chat.css";

function ChatComponent() {
    const [message, setMessage] = useState("");
    // const [response, setResponse] = useState("");

    const handleSendMessage = () => {
        if (message.trim() === "") {
            return;
        }
        setMessage("");
        axios
            .post("/send-message/", { message })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="chat-container">
            <input
                className="message-input"
                type="text"
                placeholder="Ask your questions...."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-button" onClick={handleSendMessage}>
                Send
            </button>
            {/* {response && <div className="response">{response}</div>} */}
        </div>
    );
}

export default ChatComponent;
