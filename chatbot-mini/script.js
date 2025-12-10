// Typing animation for header
const typingText = document.getElementById('typingText');
const textToType = 'Comment puis-je vous aider';
let charIndex = 0;

function typeText() {
  if (charIndex < textToType.length) {
    typingText.textContent += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100); // 100ms per character
  }
}

// Start typing animation when page loads
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeText, 500); // Small delay before starting
});

// Chat functionality
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const micBtn = document.getElementById('micBtn');
const chatMessages = document.getElementById('chatMessages');

// Bot responses
const botResponses = [
  "🙂 Je suis là pour vous aider !",
  "✨ Comment puis-je vous assister aujourd'hui ?",
  "💙 Je comprends, je suis à votre écoute.",
  "🌟 N'hésitez pas à me poser vos questions.",
  "🤝 Je suis présent pour vous accompagner.",
  "💬 Merci pour votre message, je reste disponible.",
  "🎯 Je vais faire de mon mieux pour vous répondre.",
  "😊 C'est noté, je suis là si vous avez besoin."
];

function getRandomBotResponse() {
  return botResponses[Math.floor(Math.random() * botResponses.length)];
}

function addMessage(text, isUser) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(isUser ? 'user' : 'bot');

  const bubbleDiv = document.createElement('div');
  bubbleDiv.classList.add('message-bubble');
  bubbleDiv.textContent = text;

  messageDiv.appendChild(bubbleDiv);
  chatMessages.appendChild(messageDiv);

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const message = chatInput.value.trim();
  
  if (message === '') return;

  // Add user message
  addMessage(message, true);
  
  // Clear input
  chatInput.value = '';
  chatInput.style.height = 'auto';

  // Bot response after a short delay
  setTimeout(() => {
    addMessage(getRandomBotResponse(), false);
  }, 800);
}

// Send button click
sendBtn.addEventListener('click', sendMessage);

// Enter key to send (Shift+Enter for new line)
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Auto-resize textarea
chatInput.addEventListener('input', () => {
  chatInput.style.height = 'auto';
  chatInput.style.height = chatInput.scrollHeight + 'px';
});

// Microphone button (placeholder functionality)
micBtn.addEventListener('click', () => {
  alert('🎤 Fonctionnalité microphone à implémenter avec l\'API Web Speech.');
});
