const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

const responses = {
  // General Questions
  "hello": "Hi there! How can I help you?",
  "how are you": "I'm just a bot, but I'm doing great! How about you?",
  "what is your name": "I'm a simple QnA bot!",
  "goodbye": "Goodbye! Have a great day!",
  "what can you do": "I can answer simple questions! Try asking me about health, fitness, or general facts.",
  "who created you": "I was created by a developer to assist with your questions!",
  "tell me a joke": "Why did the computer go to the doctor? Because it had a virus!",
  "2+2": "2 + 2 is 4!",
  "who is my mentor": "Pavithra Rathinavel ma'am is my mentor,a guiding light in my journey.",

  // HealthBuddy Questions
    "what is SamvaadAI": "SamvaadAI is a personalized mental health companion, offering tools for mood tracking, stress management, mental health resources, and more.",
    "how does SamvaadAI help": "SamvaadAI helps you monitor your mental well-being, manage stress, schedule therapy sessions, and access mental health resources.",
    "does SamvaadAI offer telehealth services": "Yes! You can consult with mental health professionals online through SamvaadAI.",
    "what is mental health management": "It involves practices and resources to maintain mental well-being, manage stress, and address emotional health challenges.",
    "is SamvaadAI free": "SamvaadAI offers both free and premium plans. The free plan includes basic features, while the premium plan has additional tools.",
    "how can I track my mental health progress": "SamvaadAI provides mood tracking and progress reports to help you monitor your emotional well-being over time.",
    "can I book therapy sessions with SamvaadAI": "Yes! SamvaadAI allows you to book and manage therapy sessions with licensed professionals.",
    "how do I manage mental health challenges": "Practice self-care, stay connected with loved ones, seek professional support, and engage in activities that promote relaxation.",
    "what are the benefits of SamvaadAI": "SamvaadAI offers mood tracking, stress management tips, guided mindfulness exercises, access to therapists, and mental health resources.",
    "how do stress management tips work": "SamvaadAI provides personalized tips and breathing exercises to help you manage stress and stay calm.",
    "does SamvaadAI have mental health resources": "Yes! SamvaadAI has a comprehensive resource hub with articles, videos, and self-care exercises.",
    "how do I reduce stress and anxiety": "Practice mindfulness, maintain a healthy lifestyle, engage in physical activity, and talk to someone you trust.",
    "what are common mental health issues": "Some common mental health challenges include anxiety, depression, stress, and burnout.",
    "how does stress affect mental health": "Chronic stress can lead to anxiety, depression, sleep issues, and decreased focus.",
    "does SamvaadAI support emotional well-being": "Yes! SamvaadAI offers emotional support tools and resources to help you manage your feelings.",
    "what activities improve mental health": "Activities like yoga, meditation, journaling, exercising, and spending time in nature can benefit your mental health.",
    "how often should I practice mindfulness": "It's recommended to practice mindfulness for 10-20 minutes daily for optimal benefits.",
  
  // Default Response
  "default": "I'm not sure how to respond to that. Can you try asking something else?"
};



const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const generateResponse = (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  const normalizedMessage = userMessage
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim();

  const response = responses[normalizedMessage] || responses["default"];
  messageElement.textContent = response;
  chatbox.scrollTo(0, chatbox.scrollHeight);
};


const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
