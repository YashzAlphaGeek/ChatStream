export class WebSocketClient {
    private socket: WebSocket;
    private messagesDiv: HTMLDivElement;

    constructor(url: string, messagesDiv: HTMLDivElement) {
        this.messagesDiv = messagesDiv;
        this.socket = new WebSocket(url);

        this.socket.onmessage = (event) => this.onMessage(event);
        this.socket.onopen = () => this.onOpen();
        this.socket.onclose = () => this.onClose();
        this.socket.onerror = (error) => this.onError(error);
    }

    private onMessage(event: MessageEvent): void {
        const newMessage = document.createElement('div');
        newMessage.textContent = event.data;
        this.messagesDiv.appendChild(newMessage);
    }

    private onOpen(): void {
        console.log("WebSocket connection established");
    }

    private onClose(): void {
        console.log("WebSocket connection closed");
    }

    private onError(error: Event): void {
        console.error("WebSocket error:", error);
    }

    public sendMessage(message: string): void {
        if (message) {
            this.socket.send(message);
            console.log("Message sent:", message);
        } else {
            console.log("No message to send.");
        }
    }
}
