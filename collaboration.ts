let ws: WebSocket | null = null;

export function connectCollaboration(serverUrl: string, onMessage: (data: any) => void) {
  ws = new WebSocket(serverUrl);
  ws.onopen = () => {
    // Connection established
  };
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };
}

export function sendUpdate(data: any) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}