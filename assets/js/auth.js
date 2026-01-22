let currentUser = null;

function onGoogleLogin(res) {
  const p = JSON.parse(atob(res.credential.split(".")[1]));

  currentUser = {
    name: p.name,
    email: p.email,
    avatar: p.picture
  };

  document.getElementById("login-box").innerHTML = `
    <img src="${p.picture}" width="32" style="border-radius:50%">
    <b>${p.name}</b>
  `;

  socket.emit("login", currentUser);

  if (typeof checkAdmin === "function") checkAdmin();
}
