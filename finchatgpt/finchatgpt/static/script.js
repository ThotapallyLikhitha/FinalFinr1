document.getElementById("send-btn").addEventListener("click", sendMessage);

async function sendMessage() {
  const inputField = document.getElementById("user-input");
  const message = inputField.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");

  // Add user message
  const userDiv = document.createElement("div");
  userDiv.classList.add("user-message");
  userDiv.textContent = message;
  chatBox.appendChild(userDiv);

  inputField.value = "";

  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  // Fetch bot response
  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    const botDiv = document.createElement("div");
    botDiv.classList.add("bot-message");
    botDiv.textContent = data.answer || "(No response)";
    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    const botDiv = document.createElement("div");
    botDiv.classList.add("bot-message");
    botDiv.textContent = "⚠️ Error connecting to server.";
    chatBox.appendChild(botDiv);
  }
}
