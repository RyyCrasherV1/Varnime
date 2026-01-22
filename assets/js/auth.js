let currentUser = null;

google.accounts.id.initialize({
  client_id: "ISI_CLIENT_ID_GOOGLE_KAMU",
  callback: res => {
    const data = JSON.parse(atob(res.credential.split(".")[1]));
    currentUser = {
      name: data.name,
      email: data.email,
      level: data.email.includes("admin") ? "Admin" : "User"
    };
    document.getElementById("login").innerHTML =
      "Login sebagai " + currentUser.name;
  }
});

google.accounts.id.renderButton(
  document.getElementById("login"),
  { theme: "outline", size: "large" }
);
