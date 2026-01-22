const socket = io("https://varnime-comment-server-production.up.railway.app");
const list = document.getElementById("comment-list");

socket.on("init", data => data.forEach(render));
socket.on("comment", render);

socket.on("delete", id => {
  const el = document.getElementById("c"+id);
  if(el) el.remove();
});

function render(d){
  const div = document.createElement("div");
  div.className = "comment";
  div.id = "c"+d.id;

  div.innerHTML = `
    <b>${d.name}</b>
    <span class="badge">${d.level}</span>
    <p>${d.message}</p>
    ${currentUser?.level==="Admin" ? `<button onclick="del(${d.id})">Delete</button>` : ""}
  `;
  list.appendChild(div);
}

function del(id){
  socket.emit("delete", id);
}

document.getElementById("comment-form").onsubmit = e => {
  e.preventDefault();
  if(!currentUser) return alert("Login dulu");

  socket.emit("comment", {
    name: currentUser.name,
    email: currentUser.email,
    message: message.value,
    level: currentUser.level
  });
  message.value = "";
};
