import React, { useState } from 'react';

const Chat = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (message.trim() !== '') {
                onSendMessage(message);
                setMessage('');
            }
        }
    };

    return (
        <textarea
            rows="3"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
        />
    );
};

export default Chat;
