const server = Bun.serve({
  port: 3000,
  reusePort: true,
  fetch(req, server) {
    if (req.headers.get("upgrade") !== "websocket") {
      return new Response("Expected websocket", { status: 400 });
    }

    const success = server.upgrade(req, { data: "hello" });
    return success
      ? undefined
      : new Response("Upgrade failed", { status: 400 });
  },

  websocket: {
    // maxPayloadLength: 19999,
    // backpressureLimit: 99999,
    idleTimeout: 100,
    sendPings: true,

    open(ws) {
        console.log("A WebSocket connected!");
    },
    message(ws, message) {
        console.log(message);
    },
    close(ws, code, reason) {
        console.log("A WebSocket disconnected!", code, reason);
    },
  },
});

console.log(`WebSocket server is running on ws://localhost:${server.port}`);
