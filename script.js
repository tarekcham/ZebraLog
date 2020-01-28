const socket = io("http://localhost:3000");
const answerForm = document.getElementById("submit-container");
const answerInput = document.getElementById("answer-input");
const answerContainer = document.getElementById("answer-container");

const name = `user ${Math.round(Math.random() * 100)} `;
appendanswer("You joined");
socket.emit("new-user", name);

socket.on("user-answer", data => {
  appendanswer(`${data.name} : ${data.answer}`);
});

socket.on("user-connected", name => {
  appendanswer(`${name} joined`);
});

socket.on("user-disconnected", name => {
  appendanswer(`${name} disconnected `);
});

answerForm.addEventListener("submit", e => {
  e.preventDefault();
  const answer = answerInput.value;
  appendanswer(`You: ${answer}`);
  socket.emit("send-user-answer", answer);
  answerInput.value = "";
});

function appendanswer(answer) {
  const answerElement = document.createElement("div");
  answerElement.innerText = answer;
  answerContainer.append(answerElement);
}
