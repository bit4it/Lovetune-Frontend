// Transport-agnostic realtime layer. UI code only calls connect/send/on. Implement the TODOs when the server is ready.
const handlers = {}
export const realtime = {
  connected: false,
  connect(roomCode) { this.connected = true /* TODO: this.ws = new WebSocket(`${import.meta.env.VITE_WS_URL}?room=${roomCode}`); this.ws.onmessage = (e) => this.dispatch(JSON.parse(e.data)) */ },
  disconnect() { this.connected = false /* TODO: this.ws?.close() */ },
  send(type, payload) { if (!this.connected) return /* TODO: this.ws.send(JSON.stringify({ type, payload })) */ },
  on(type, fn) { (handlers[type] ||= new Set()).add(fn); return () => handlers[type].delete(fn) },
  dispatch({ type, payload }) { handlers[type]?.forEach((fn) => fn(payload)) },
}
