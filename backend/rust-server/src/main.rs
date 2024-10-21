use warp::Filter;
use warp::ws::{Message, WebSocket};
use futures::{StreamExt, SinkExt}; 

#[tokio::main]
async fn main() {
    // Define the WebSocket route
    let ws_route = warp::path("ws")
        .and(warp::ws())
        .map(|ws: warp::ws::Ws| {
            ws.on_upgrade(handle_socket)
        });

    println!("Running WebSocket server on ws://localhost:8080");

    // Start the server
    warp::serve(ws_route).run(([127, 0, 0, 1], 8080)).await;
}

// Function to handle incoming WebSocket connections
async fn handle_socket(ws: WebSocket) {
    let (mut ws_sender, mut ws_receiver) = ws.split();
    while let Some(result) = ws_receiver.next().await {
        match result {
            Ok(message) => {
                let response = Message::text(format!("Echo: {}", message.to_str().unwrap_or("Invalid UTF-8")));
                if ws_sender.send(response).await.is_err() {
                    break; 
                }
            }
            Err(_) => {
                break; 
            }
        }
    }
}
