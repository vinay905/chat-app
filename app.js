const ws = new WebSocket('ws://localhost:7070');

const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const chatWindow = document.getElementById('chat-window');
const output = document.getElementById('output');

ws.onopen = () => {
  console.log('Connected to WebSocket server');
};

ws.onmessage = (event) => {
  const message = document.createElement('p');
  console.log(event.data);
  message.textContent = event.data;
  output.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

sendButton.addEventListener('click', () => {
    console.log(messageInput.value);
  const message = messageInput.value;
  ws.send(message);
  messageInput.value = '';
});

messageInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});
