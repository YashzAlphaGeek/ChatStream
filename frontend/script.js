var socket = new WebSocket("ws://localhost:8080/ws");
var messageInput = document.getElementById("messageInput");
var sendButton = document.getElementById("sendButton");
var messagesDiv = document.getElementById("messages");
// Handle incoming messages
socket.onmessage = function (event) {
    var message = event.data;
    displayMessage(message, 'server');
};
// Send message on button click
sendButton.onclick = function () {
    var message = messageInput.value;
    if (message) {
        socket.send(message);
        displayMessage(message, 'user');
        messageInput.value = ''; // Clear input field
    }
};
// Display message in the UI
function displayMessage(message, sender) {
    var messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.className = "message ".concat(sender);
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the bottom
}
// Handle WebSocket connection open
socket.onopen = function () {
    console.log("Connected to WebSocket server");
};
// Handle WebSocket connection close
socket.onclose = function () {
    console.log("Disconnected from WebSocket server");
};
