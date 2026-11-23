import React, { useState } from 'react';
import { personalData } from '../portfolioData';
import { Bot, X, Send, Sparkles, User, Briefcase, Award, Code, Phone, ShieldCheck } from 'lucide-react';
import { sanitizeInput } from '../utils/security';

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello! I'm Worku Fikadu's AI Portfolio Assistant. Ask me anything about his projects, technical expertise at Goldman Tech PLC, certificates, or services!`
    }
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    "What services does Worku offer?",
    "Tell me about Worku's projects",
    "How can I contact Worku?",
    "What certificates does he have?"
  ];

  const handleSend = (userText) => {
    const raw = userText || input;
    const textToSend = sanitizeInput(raw);
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!userText) setInput('');

    // AI Response generation logic based on portfolioData
    setTimeout(() => {
      const q = textToSend.toLowerCase();
      let reply = "";

      if (q.includes("service") || q.includes("offer") || q.includes("erp") || q.includes("mobile") || q.includes("ecommerce")) {
        reply = `Worku provides full-cycle engineering services: Mobile App Development (Flutter/Kotlin), Custom ERP systems, E-Commerce with Telebirr/CBE payment integration, Cybersecurity audits, and Tech Consultancy for startups. Check out the Services tab!`;
      } else if (q.includes("project") || q.includes("github") || q.includes("pdms") || q.includes("kebele")) {
        reply = `Worku has built real-world systems including: 1) Ethiopian National Patient Data Management System (NPDMS with Fayda ID), 2) Bosa Addis Kebele Management System, 3) CBE Digital Banking Simulator, 4) Busa Gonofa Oromia Enterprise platform, and native mobile apps. You can view source code on the Projects page!`;
      } else if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("hire") || q.includes("call")) {
        reply = `You can reach Worku directly at: 📞 Primary: +251 911 076 458, 📧 Email: workufikadu643@gmail.com, or on Telegram @Olinafyadi. He is open for freelance and leadership roles!`;
      } else if (q.includes("certificate") || q.includes("award") || q.includes("hackathon")) {
        reply = `Worku holds 5 verified credentials: 1) Bruh-Ethiopia Innovative Business Idea Bootcamp (MoLS & SNV), 2) Certificate of Mastery in Advanced Full-Stack (YAI), 3) 3rd Place IDEEZA Cohort 7 Hackathon, 4) Foundations of AI (InnoLearn & Florida Univ Southeast), and 5) Certificate of Appreciation from Jimma Bosa Addis.`;
      } else if (q.includes("who") || q.includes("about") || q.includes("goldman") || q.includes("experience")) {
        reply = `Worku Fikadu is a Computer Science Graduate Candidate at Jimma University (2027 GC) and Technical Team Leader at Goldman Tech PLC. He is fluent in 4 languages: Afan Oromo, Amharic, English, and Arabic!`;
      } else {
        reply = `Thank you for asking! Worku specializes in scalable distributed architectures, cross-platform mobile apps, and enterprise software. Feel free to explore the Projects or Contact pages, or call him directly at +251 911 076 458!`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 450);
  };

  return (
    <>
      {/* Floating Assistant Trigger Pill */}
      <button 
        className="ai-assistant-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask Worku's AI Assistant"
        title="Chat with Worku's Interactive AI Assistant"
      >
        <div className="ai-trigger-pulse"></div>
        <Bot size={22} className="ai-bot-icon" />
        <span className="ai-trigger-text">Ask AI</span>
      </button>

      {/* Interactive Modal Drawer */}
      {isOpen && (
        <div className="ai-chat-window card-glass">
          <div className="ai-chat-header">
            <div className="ai-header-info">
              <div className="ai-avatar-wrap">
                <Bot size={18} />
              </div>
              <div>
                <h4>Worku AI Assistant</h4>
                <span className="ai-status-indicator">
                  <span className="pulsing-dot mini"></span> Online · Instant Answer
                </span>
              </div>
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="ai-chat-body">
            {messages.map((m, idx) => (
              <div key={idx} className={`ai-message-bubble ${m.sender === 'user' ? 'user' : 'bot'}`}>
                {m.sender === 'bot' && <Bot size={16} className="message-icon" />}
                <div className="message-content">
                  <p>{m.text}</p>
                </div>
              </div>
            ))}

            {/* Quick Prompts */}
            <div className="ai-quick-prompts">
              <span className="quick-title">Suggested Inquiries:</span>
              <div className="quick-buttons-list">
                {quickQuestions.map((q, qIdx) => (
                  <button key={qIdx} className="quick-btn" onClick={() => handleSend(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
            className="ai-chat-input-bar"
          >
            <input 
              type="text" 
              placeholder="Ask anything about Worku's work..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="ai-send-btn" aria-label="Send Message">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
