/**
 * Miracle Studio Photography - Floating AI Assistant Component
 * Provides instant responses to common questions with interactive prompt chips.
 */

const STUDIO_FAQS = [
  {
    q: 'What photography services do you provide?',
    a: 'Miracle Studio provides 10 specialized services: Wedding, Pre-Wedding, Birthday, Baby & Kids, Portrait, Engagement, Event, Product Photography (commercial shoots for client products), Maternity, and Traditional Photography.'
  },
  {
    q: 'Do you provide wedding photography?',
    a: 'Yes! Wedding and Pre-Wedding photography are our signature specialties. We provide candid moments, rituals coverage, couple portraits, and custom luxury photo albums.'
  },
  {
    q: 'How can I book a photoshoot?',
    a: 'You can submit your photoshoot request on our Booking page! Fill in your preferred service and date, and our team will get in touch with you.'
  },
  {
    q: 'What packages are available?',
    a: 'We offer packages for Portrait Sessions, Celebrations & Events, Grand Weddings, and Commercial Product Shoots. Check out our Packages page for all inclusions.'
  },
  {
    q: 'What is your photography process?',
    a: 'Our process includes: 1) Consultation to understand your aesthetic vision, 2) Professional photography session, 3) High-definition editing & color retouching, and 4) Digital gallery & physical album delivery.'
  },
  {
    q: 'How can I contact Miracle Studio?',
    a: 'You can reach us through our Contact page enquiry form, message us on WhatsApp, or connect via Instagram. We respond promptly on business days.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  injectChatbotUI();
  setupChatbotEvents();
});

function injectChatbotUI() {
  const chatbotHTML = `
    <!-- Floating Trigger Button -->
    <button id="chatbotTrigger" class="chatbot-trigger" aria-label="Open Miracle Studio Assistant">
      <svg viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
        <circle cx="8" cy="9" r="1.5"/>
        <circle cx="12" cy="9" r="1.5"/>
        <circle cx="16" cy="9" r="1.5"/>
      </svg>
    </button>

    <!-- Chatbot Window -->
    <div id="chatbotWindow" class="chatbot-window">
      <div class="chatbot-header">
        <div>
          <h4 class="chatbot-title">Miracle Studio Assistant</h4>
          <span class="chatbot-subtitle">How can I help you?</span>
        </div>
        <button id="chatbotClose" class="chatbot-close" aria-label="Close Assistant">&times;</button>
      </div>

      <div id="chatMessages" class="chatbot-messages">
        <div class="chat-bubble assistant">
          Hello! Welcome to <strong>Miracle Studio Photography</strong>. How can I assist you with your photoshoot today?
        </div>
      </div>

      <!-- Suggested Question Chips -->
      <div class="chat-suggestions">
        <button class="suggestion-chip" data-question="What photography services do you provide?">Services?</button>
        <button class="suggestion-chip" data-question="Do you provide wedding photography?">Weddings?</button>
        <button class="suggestion-chip" data-question="How can I book a photoshoot?">How to Book?</button>
        <button class="suggestion-chip" data-question="What packages are available?">Packages?</button>
        <button class="suggestion-chip" data-question="What is your photography process?">Our Process</button>
        <button class="suggestion-chip" data-question="How can I contact Miracle Studio?">Contact Studio</button>
      </div>

      <!-- Input Form -->
      <form id="chatForm" class="chatbot-input-wrap">
        <input 
          type="text" 
          id="chatInput" 
          class="chatbot-input" 
          placeholder="Ask a question..." 
          autocomplete="off" 
          required 
        />
        <button type="submit" class="chatbot-send-btn" aria-label="Send Message">Send</button>
      </form>
    </div>
  `;

  const container = document.createElement('div');
  container.id = 'miracleChatbotRoot';
  container.innerHTML = chatbotHTML;
  document.body.appendChild(container);
}

function setupChatbotEvents() {
  const trigger = document.getElementById('chatbotTrigger');
  const win = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotClose');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const messagesContainer = document.getElementById('chatMessages');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  if (!trigger || !win) return;

  trigger.addEventListener('click', () => {
    win.classList.toggle('open');
    if (win.classList.contains('open')) {
      chatInput.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    win.classList.remove('open');
  });

  // Suggestion chips
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const question = chip.getAttribute('data-question');
      handleUserQuery(question);
    });
  });

  // Form submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;
    chatInput.value = '';
    handleUserQuery(query);
  });

  function handleUserQuery(userText) {
    // 1. Append user bubble
    appendBubble(userText, 'user');

    // 2. Determine response
    const answer = getAnswerForQuery(userText);

    // 3. Simulate natural typing delay
    setTimeout(() => {
      appendBubble(answer, 'assistant');
    }, 400);
  }

  function appendBubble(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function getAnswerForQuery(input) {
    const clean = input.toLowerCase();

    // Exact or keyword match
    for (const item of STUDIO_FAQS) {
      if (item.q.toLowerCase().includes(clean) || clean.includes(item.q.toLowerCase())) {
        return item.a;
      }
    }

    if (clean.includes('wedding') || clean.includes('pre-wedding')) {
      return STUDIO_FAQS[1].a;
    }
    if (clean.includes('service') || clean.includes('shoot') || clean.includes('portrait')) {
      return STUDIO_FAQS[0].a;
    }
    if (clean.includes('book') || clean.includes('date') || clean.includes('reserve')) {
      return STUDIO_FAQS[2].a;
    }
    if (clean.includes('package') || clean.includes('price') || clean.includes('cost') || clean.includes('rate')) {
      return STUDIO_FAQS[3].a;
    }
    if (clean.includes('process') || clean.includes('step') || clean.includes('edit')) {
      return STUDIO_FAQS[4].a;
    }
    if (clean.includes('contact') || clean.includes('phone') || clean.includes('email') || clean.includes('where')) {
      return STUDIO_FAQS[5].a;
    }

    return "Thank you for asking! We specialize in capturing life's finest moments with 10 professional photography services. Feel free to browse our Portfolio, Packages, or submit a request directly on our Booking page!";
  }
}
