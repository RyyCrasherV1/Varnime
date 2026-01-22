const socket = io("https://varnime-comment-server-production.up.railway.app", {
  transports: ["websocket"]
});

const titles = {};
const list = document.getElementById("comment-list");
const msgInput = document.getElementById("message");

socket.on("setTitle", d => {
  titles[d.target] = d.title;
});

socket.on("comment", d => {
  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `
    <b>${d.name}</b>
    <span class="title">[${titles[d.email] || "NPC"}]</span>
    <p>${d.message}</p>
  `;
  list.appendChild(div);
});

document.getElementById("comment-form").onsubmit = e => {
  e.preventDefault();

  if (!currentUser) return alert("Login dulu Tong");

  socket.emit("comment", {
    name: currentUser.name,
    email: currentUser.email,
    message: msgInput.value
  });

  msgInput.value = "";
};
