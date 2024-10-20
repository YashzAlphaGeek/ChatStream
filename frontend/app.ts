// app.ts

import { WebSocketClient } from './websocket';

// Define the UI elements
const messageInput = document.getElementById('messageInput') as HTMLInputElement;
const messagesDiv = document.getElementById('messages') as HTMLDivElement;
const sendButton = document.getElementById('sendButton') as HTMLButtonElement;
const fileInput = document.getElementById('fileInput') as HTMLInputElement;

// Create WebSocket client instance
const socketClient = new WebSocketClient('ws://localhost:8080/ws', messagesDiv);

// Send text message
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    socketClient.sendMessage(message);
    messageInput.value = ''; // Clear the input
});

// Handle file uploads
fileInput.addEventListener('change', async (event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const newMessage = document.createElement('div');
                newMessage.textContent = 'File uploaded successfully!';
                messagesDiv.appendChild(newMessage);
            } else {
                throw new Error('File upload failed');
            }
        } catch (error) {
            console.error(error);
        }
    }
});
