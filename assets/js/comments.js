// CONNECT KE SERVER RAILWAY
const socket = io(
  "https://varnime-comment-server-production-d2f9.up.railway.app",
  { transports: ["websocket"] }
);

const list = document.getElementById("comment-list");
const form = document.getElementById("comment-form");
const messageInput = document.getElementById("message");

// INIT (LOAD KOMENTAR AWAL)
socket.on("init", data => {
  list.innerHTML = "";
  data.forEach(render);
});

// KOMENTAR BARU
socket.on("comment", render);

// DELETE KOMENTAR
socket.on("delete", id => {
  const el = document.getElementById("c-" + id);
  if (el) el.remove();
});

// UPDATE (LEVEL / TITLE)
socket.on("update", data => {
  list.innerHTML = "";
  data.forEach(render);
});

// RENDER KOMENTAR
function render(c) {
  const div = document.createElement("div");
  div.id = "c-" + c.id;
  div.className = "comment";

  div.innerHTML = `
    <b>${c.name}</b>
    <span class="level" style="color:#ffc107;margin-left:6px">
      [${c.level}]
    </span>
    <p>${c.message}</p>
    ${
      window.user && window.user.isAdmin
        ? `<button onclick="delComment(${c.id})" style="color:red">🗑</button>`
        : ""
    }
  `;

  list.appendChild(div);
}

// KIRIM KOMENTAR
form.onsubmit = e => {
  e.preventDefault();

  if (!window.user) {
    alert("Login dulu bang 😅");
    return;
  }

  socket.emit("comment", {
    name: window.user.name,
    email: window.user.email,
    message: messageInput.value
  });

  messageInput.value = "";
};

// DELETE KOMENTAR (ADMIN)
function delComment(id) {
  if (!window.user || !window.user.isAdmin) return;

  socket.emit("delete", {
    id,
    email: window.user.email
  });
}
