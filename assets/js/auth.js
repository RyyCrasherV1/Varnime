let currentUser = null;

window.onload = () => {
  google.accounts.id.initialize({
    client_id: "ISI_GOOGLE_CLIENT_ID_KAMU",
    callback: res => {
      const data = JSON.parse(atob(res.credential.split(".")[1]));
      currentUser = {
        name: data.name,
        email: data.email
      };
      document.getElementById("login").innerText =
        "Login sebagai " + currentUser.name;
    }
  });

  google.accounts.id.renderButton(
    document.getElementById("login"),
    { theme: "outline", size: "large" }
  );
};
