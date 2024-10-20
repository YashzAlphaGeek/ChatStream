const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');
const sendButton = document.getElementById('sendButton');
const fileInput = document.getElementById('fileInput');

// Connect to WebSocket server
const socket = new WebSocket('ws://localhost:8080/ws');

// Handle incoming messages
socket.onmessage = (event) => {
  const newMessage = document.createElement('div');
  newMessage.textContent = event.data;
  messagesDiv.appendChild(newMessage);
};

// Send text message
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    socket.send(message);
    messageInput.value = '';
  }
});

// Handle file uploads
fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const newMessage = document.createElement('div');
      newMessage.textContent = 'File uploaded successfully!';
      messagesDiv.appendChild(newMessage);
    } else {
      console.error('File upload failed');
    }
  }
});
