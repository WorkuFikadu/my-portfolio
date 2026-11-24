import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot, X, Send, Phone, Mail, ArrowRight, ExternalLink, RotateCcw, MessageCircle
} from 'lucide-react';
import { personalData } from '../portfolioData';
import { sanitizeInput } from '../utils/security';
import { generateAiResponse } from '../utils/aiAssistantBrain';

/**
 * Safely renders inline **bold** and *italic* segments using React elements
 * (no dangerouslySetInnerHTML).
 */
function renderFormattedLine(text) {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      return <strong key={i}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith('*') && token.endsWith('*') && token.length > 2) {
      return <em key={i}>{token.slice(1, -1)}</em>;
    }
    return <React.Fragment key={i}>{token}</React.Fragment>;
  });
}

const INITIAL_MESSAGE = {
  sender: 'bot',
  paragraphs: [
    `Hello! I'm **Worku Fikadu's AI Portfolio Assistant**. Ask me anything about Worku's background, all 8 engineering services, Goldman Tech PLC leadership, projects, skills, or certifications.`,
    `You can also ask **out-of-the-box tech or project questions** — I'll do my best to answer and connect you directly with Worku!`
  ],
  followUps: [
    'About Worku',
    'All 8 Services',
    'Featured Projects',
    'Tech Stack & Skills',
    'Certificates (5)',
    'Contact & Hire'
  ]
};

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const replyTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) {
        clearTimeout(replyTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && (messages.length > 1 || isTyping)) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (userText) => {
    const raw = typeof userText === 'string' ? userText : input;
    const textToSend = sanitizeInput(raw);
    if (!textToSend.trim() || isTyping) return;

    setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
    if (typeof userText !== 'string') {
      setInput('');
    }
    setIsTyping(true);

    if (replyTimerRef.current) {
      clearTimeout(replyTimerRef.current);
    }

    replyTimerRef.current = setTimeout(() => {
      const response = generateAiResponse(textToSend);
      setMessages((prev) => [...prev, { sender: 'bot', ...response }]);
      setIsTyping(false);
    }, 320);
  };

  const handleReset = () => {
    if (replyTimerRef.current) {
      clearTimeout(replyTimerRef.current);
    }
    setIsTyping(false);
    setMessages([INITIAL_MESSAGE]);
  };

  const latestBotMsg = [...messages].reverse().find((m) => m.sender === 'bot');
  const activeFollowUps = latestBotMsg?.followUps || INITIAL_MESSAGE.followUps;

  return (
    <>
      {/* Floating Assistant Trigger Pill */}
      <button
        type="button"
        className="ai-assistant-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Ask Worku's AI Assistant"
        aria-expanded={isOpen}
        title="Chat with Worku's Interactive AI Assistant"
      >
        <div className="ai-trigger-pulse"></div>
        <Bot size={22} className="ai-bot-icon" />
        <span className="ai-trigger-text">Ask AI</span>
      </button>

      {/* Interactive Chat Window */}
      {isOpen && (
        <div
          className="ai-chat-window card-glass"
          role="dialog"
          aria-label="Worku AI Assistant"
        >
          <div className="ai-chat-header">
            <div className="ai-header-info">
              <div className="ai-avatar-wrap">
                <Bot size={18} />
              </div>
              <div>
                <h4>Worku AI Assistant</h4>
                <span className="ai-status-indicator">
                  <span className="pulsing-dot mini"></span> Trained on Portfolio & Services
                </span>
              </div>
            </div>
            <div className="ai-header-controls">
              <button
                type="button"
                className="ai-icon-btn"
                onClick={handleReset}
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                className="ai-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Assistant"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="ai-chat-body">
            {messages.map((m, idx) => (
              <div key={idx} className={`ai-message-bubble ${m.sender === 'user' ? 'user' : 'bot'}`}>
                {m.sender === 'bot' && <Bot size={16} className="message-icon" />}
                <div className="message-content">
                  {m.sender === 'user' ? (
                    <p>{m.text}</p>
                  ) : (
                    <>
                      {m.paragraphs?.map((para, pIdx) => (
                        <p key={pIdx} className="ai-msg-paragraph">
                          {para.split('\n').map((line, lIdx) => (
                            <React.Fragment key={lIdx}>
                              {lIdx > 0 && <br />}
                              {renderFormattedLine(line)}
                            </React.Fragment>
                          ))}
                        </p>
                      ))}

                      {m.bullets?.length > 0 && (
                        <ul className="ai-msg-bullets">
                          {m.bullets.map((item, bIdx) => (
                            <li key={bIdx}>{renderFormattedLine(item)}</li>
                          ))}
                        </ul>
                      )}

                      {m.recommendation && (
                        <div className="ai-recommendation-box">
                          <p>{renderFormattedLine(m.recommendation)}</p>
                        </div>
                      )}

                      {(m.route || m.externalLink || m.showContactActions) && (
                        <div className="ai-msg-actions">
                          {m.route && (
                            <button
                              type="button"
                              className="ai-action-chip primary"
                              onClick={() => navigate(m.route.path)}
                            >
                              <span>{m.route.label}</span>
                              <ArrowRight size={12} />
                            </button>
                          )}
                          {m.externalLink && (
                            <a
                              href={m.externalLink.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ai-action-chip"
                            >
                              <span>{m.externalLink.label}</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                          {m.showContactActions && (
                            <>
                              {m.route?.path !== '/contact' && (
                                <button
                                  type="button"
                                  className="ai-action-chip contact"
                                  onClick={() => navigate('/contact')}
                                >
                                  <MessageCircle size={12} />
                                  <span>Contact Worku</span>
                                </button>
                              )}
                              <a
                                href={`tel:${personalData.contact.primaryPhone}`}
                                className="ai-action-chip"
                              >
                                <Phone size={12} />
                                <span>Call</span>
                              </a>
                              <a
                                href={`mailto:${personalData.contact.email}`}
                                className="ai-action-chip"
                              >
                                <Mail size={12} />
                                <span>Email</span>
                              </a>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message-bubble bot">
                <Bot size={16} className="message-icon" />
                <div className="message-content ai-typing-bubble" aria-label="Assistant is typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {/* Compact Follow-up / Suggested Inquiries */}
            {!isTyping && (
              <div className="ai-quick-prompts">
                <span className="quick-title">Ask or Explore:</span>
                <div className="quick-chips-row">
                  {activeFollowUps.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className="quick-chip-btn"
                      onClick={() => handleSend(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="ai-chat-input-bar"
          >
            <input
              type="text"
              placeholder="Ask about Worku, services, or any idea..."
              value={input}
              maxLength={320}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="ai-send-btn" aria-label="Send Message" disabled={isTyping}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
