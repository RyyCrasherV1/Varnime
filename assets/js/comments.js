const socket = io(
  "https://varnime-comment-server-production.up.railway.app",
  {
    transports: ["websocket"]
  }
);
