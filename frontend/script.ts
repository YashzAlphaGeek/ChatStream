const socket = new WebSocket("ws://localhost:8080/ws");

const messageInput = document.getElementById("messageInput") as HTMLInputElement;
const sendButton = document.getElementById("sendButton") as HTMLButtonElement;
const messagesDiv = document.getElementById("messages") as HTMLDivElement;

// Handle incoming messages
socket.onmessage = function(event: MessageEvent) {
    const message = event.data;
    displayMessage(message, 'server');
};

// Send message on button click
sendButton.onclick = function() {
    const message = messageInput.value;
    if (message) {
        socket.send(message);
        displayMessage(message, 'user');
        messageInput.value = ''; // Clear input field
    }
};

// Display message in the UI
function displayMessage(message: string, sender: string) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.className = `message ${sender}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the bottom
}

// Handle WebSocket connection open
socket.onopen = function() {
    console.log("Connected to WebSocket server");
};

// Handle WebSocket connection close
socket.onclose = function() {
    console.log("Disconnected from WebSocket server");
};
