let socket = io();
let user = "";
let chatbox = document.getElementById("chatbox");

Swal.fire({
  title: "autentification",
  input: "text",
  text: "set username for the Ashe's chat",
  inputValidator: (value) => {
    return !value.trin() && "Please write a username!";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  document.getElementById("username").innerHTML = user;
});

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trin().length > 0) {
      socket.emit("message", {
        user,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

socket.on("logs", (data) => {
  const divLog = document.getElementById("messageLogs");
  let messages = "";
  data.reverse().forEach((message) => {
    messages += `<p><i>${message.user}</i> : ${message.message}</p>`;
  });
  divLog.innerHTML = messages;
});
