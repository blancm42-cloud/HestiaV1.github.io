// Mode Conversation - STT avec auto-envoi + TTS avec interruption
(function() {
  'use strict';

  let isConversationActive = false;
  let recognition = null;
  let silenceTimer = null;
  let isSpeaking = false;
  let currentUtterance = null;
  let lastTranscript = '';
  let isSending = false; // Flag to prevent restart during message sending

  const conversationBtn = document.getElementById('conversationModeBtn');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatMessagesZone = document.querySelector('.chat-messages-zone');

  if (!conversationBtn || !chatInput || !chatSendBtn || !chatMessagesZone) {
    console.warn('[Conversation Mode] Missing required elements');
    return;
  }

  // Check browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechSynthesis = window.speechSynthesis;

  if (!SpeechRecognition || !SpeechSynthesis) {
    conversationBtn.style.display = 'none';
    console.warn('[Conversation Mode] Browser does not support Speech APIs');
    return;
  }

  // Initialize recognition
  recognition = new SpeechRecognition();
  recognition.lang = 'fr-FR';
  recognition.interimResults = true;
  recognition.continuous = false;

  // Start/stop conversation mode
  conversationBtn.addEventListener('click', () => {
    if (isConversationActive) {
      stopConversationMode();
    } else {
      startConversationMode();
    }
  });

  function startConversationMode() {
    isConversationActive = true;
    conversationBtn.classList.add('active');
    conversationBtn.setAttribute('aria-pressed', 'true');
    document.body.classList.add('conversation-on');
    lastTranscript = ''; // Reset on mode start
    startListening();
  }

  function stopConversationMode() {
    isConversationActive = false;
    conversationBtn.classList.remove('active');
    conversationBtn.setAttribute('aria-pressed', 'false');
    document.body.classList.remove('conversation-on');
    stopListening();
    stopSpeaking();
  }

  function startListening() {
    if (!isConversationActive || isSending) return;
    
    try {
      recognition.start();
    } catch (e) {
      console.warn('[Conversation Mode] Recognition already started');
    }
  }

  function stopListening() {
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      silenceTimer = null;
    }
    
    try {
      recognition.stop();
    } catch (e) {
      // Already stopped
    }
  }

  function stopSpeaking() {
    if (isSpeaking) {
      isSpeaking = false;
      SpeechSynthesis.cancel();
      currentUtterance = null;
    }
  }

  function speakResponse(text) {
    if (!text) return;

    stopSpeaking();
    
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'fr-FR';
    currentUtterance.rate = 1.0;
    currentUtterance.pitch = 1.0;
    
    currentUtterance.onstart = () => {
      isSpeaking = true;
    };
    
    currentUtterance.onend = () => {
      isSpeaking = false;
      currentUtterance = null;
      // Restart listening after bot finishes speaking
      if (isConversationActive) {
        setTimeout(() => startListening(), 500);
      }
    };
    
    currentUtterance.onerror = () => {
      isSpeaking = false;
      currentUtterance = null;
      if (isConversationActive) {
        setTimeout(() => startListening(), 500);
      }
    };
    
    SpeechSynthesis.speak(currentUtterance);
  }

  // Handle speech recognition results
  recognition.onresult = (event) => {
    if (!isConversationActive) return;

    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    // Accumulate final transcript
    if (finalTranscript) {
      lastTranscript += (lastTranscript ? ' ' : '') + finalTranscript.trim();
    }

    // Update input field with accumulated + interim
    const displayText = lastTranscript + (interimTranscript ? ' ' + interimTranscript.trim() : '');
    chatInput.value = displayText.trim();

    // Reset silence timer on any speech
    if (silenceTimer) {
      clearTimeout(silenceTimer);
    }

    // Set 2 second silence timer - will trigger if user stops talking
    silenceTimer = setTimeout(() => {
      const currentText = chatInput.value.trim();
      if (currentText && isConversationActive) {
        lastTranscript = currentText;
        sendMessage();
      }
    }, 2000);
  };

  recognition.onend = () => {
    // Auto-restart listening if still in conversation mode and not speaking or sending
    if (isConversationActive && !isSpeaking && !isSending) {
      setTimeout(() => startListening(), 100);
    }
  };

  recognition.onerror = (event) => {
    console.error('[Conversation Mode] Recognition error:', event.error);
    if (event.error === 'no-speech') {
      // Restart listening
      if (isConversationActive) {
        setTimeout(() => startListening(), 100);
      }
    }
  };

  // Override recognition.onstart to stop speaking if bot is talking
  recognition.onstart = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
  };

  async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    isSending = true; // Prevent auto-restart
    stopListening();
    
    // Keep the message in the input for sendChatMessageWithSpeech to use
    chatInput.value = message;

    try {
      // Use the conversation-aware version that speaks while typing
      if (typeof window.sendChatMessageWithSpeech === 'function') {
        await window.sendChatMessageWithSpeech();
      } else if (typeof window.sendChatMessage === 'function') {
        // Fallback to regular version
        await window.sendChatMessage();
      }
    } catch (error) {
      console.error('[Conversation Mode] Error:', error);
    } finally {
      lastTranscript = ''; // Reset after sending
      isSending = false; // Allow restart
    }
  }

  async function fetchBotResponse(userMessage) {
    // Use existing fetchBotResponse if available, otherwise fallback
    if (typeof window.fetchBotResponse === 'function') {
      return await window.fetchBotResponse(userMessage);
    }

    // Fallback: simple echo or API call
    const apiKey = 'AIzaSyAwlLQkdrM3J4KG4wTWMVRRBBx3h42nGTg';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: userMessage }]
        }]
      })
    });

    if (!resp.ok) throw new Error('API error');

    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Désolé, je n\'ai pas compris.';
    return text;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Expose speakResponse globally for dashboard to use
  window.startConversationSpeech = (text) => {
    speakResponse(text);
  };

})();
