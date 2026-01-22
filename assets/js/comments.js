const socket = io(
  "https://varnime-comment-server-production.up.railway.app",
  { transports: ["websocket"] }
);

const form = document.getElementById("comment-form");
const list = document.getElementById("comment-list");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");

// kirim komentar
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (!username || !message) return;

  socket.emit("comment", {
    user: username,
    text: message,
    time: Date.now()
  });

  messageInput.value = "";
});

// terima komentar realtime
socket.on("comment", (data) => {
  const div = document.createElement("div");
  div.className = "comment-item";

  div.innerHTML = `
    <strong>${data.user}</strong>
    <span>${data.text}</span>
  `;

  list.appendChild(div);
  list.scrollTop = list.scrollHeight;
});
