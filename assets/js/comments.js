const socket = io("https://varnime-comment-server-production.up.railway.app");

const list = document.getElementById("comment-list");

socket.on("init", data => {
  list.innerHTML = "";
  data.forEach(render);
});

socket.on("comment", render);

socket.on("delete", id => {
  document.getElementById("c-" + id)?.remove();
});

socket.on("update", data => {
  list.innerHTML = "";
  data.forEach(render);
});

function render(c) {
  const div = document.createElement("div");
  div.id = "c-" + c.id;
  div.innerHTML = `
    <b>${c.name}</b>
    <span style="color:#ffcc00">[${c.level}]</span>
    <p>${c.message}</p>
    ${window.user?.email && window.user?.isAdmin
      ? `<button onclick="del(${c.id})">❌</button>`
      : ""}
  `;
  list.appendChild(div);
}

function del(id) {
  socket.emit("delete", {
    id,
    email: window.user.email
  });
}

document.getElementById("comment-form").onsubmit = e => {
  e.preventDefault();
  socket.emit("comment", {
    name: user.name,
    email: user.email,
    message: message.value
  });
  message.value = "";
};
