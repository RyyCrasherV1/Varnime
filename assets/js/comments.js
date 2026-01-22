const socket = io(
  "https://varnime-comment-server-production.up.railway.app",
  { transports: ["websocket"] }
);

const list = document.getElementById("comment-list");
const form = document.getElementById("comment-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("comment", {
    user: username.value,
    text: message.value
  });

  message.value = "";
});

socket.on("comment", (data) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <b>${data.user}</b>
    <small>[${data.role}]</small>
    <span class="title">${data.title}</span><br>
    ${data.text}
  `;
  list.appendChild(div);
});
