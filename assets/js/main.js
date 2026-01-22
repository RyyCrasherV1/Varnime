const episodeId = location.pathname; 
const socket = io("https://varnime-comment-server.up.railway.app");

function login() {
  socket.emit("login", {
    username: username.value,
    token: token.value,
    episodeId
  });

  commentBox.style.display = "flex";
}

function send() {
  if (!msg.value) return;
  socket.emit("comment", msg.value);
  msg.value = "";
}

socket.on("comment", data => {
  if (data.episodeId !== episodeId) return;

  const li = document.createElement("li");
  li.innerHTML = `${data.icon} <b>${data.role}</b> ${data.user}: ${data.text}`;
  comments.appendChild(li);
});
