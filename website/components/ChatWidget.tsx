"use client";

import { useState } from "react";
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaFacebookMessenger, 
  FaChevronDown, 
  FaCommentDots
} from "react-icons/fa6";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chat-widget-window">
          <div className="chat-widget-header" onClick={() => setIsOpen(false)}>
             <div className="chat-widget-header-left">
                <div className="chat-widget-logo-mark">CX</div>
                <span className="chat-widget-title">Have a question?</span>
             </div>
             <button className="chat-widget-close" aria-label="Close chat">
               <FaChevronDown />
             </button>
          </div>
          
          <div className="chat-widget-body">
             <div className="chat-widget-message">
               <div className="chat-widget-avatar-small">CX</div>
               <div className="chat-widget-bubble">
                 Choose how you'd like to chat with us.
               </div>
             </div>
             
             <div className="chat-widget-options">
                <a href="/contact#enquiry-form" className="chat-widget-option">
                   <FaCommentDots className="chat-icon" />
                   <span>Chat via Live Chat</span>
                </a>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="chat-widget-option">
                   <FaWhatsapp className="chat-icon" style={{ color: "#25D366" }} />
                   <span>Chat with WhatsApp</span>
                </a>
                <a href="https://m.me/charterx" target="_blank" rel="noopener noreferrer" className="chat-widget-option">
                   <FaFacebookMessenger className="chat-icon" style={{ color: "#00B2FF" }} />
                   <span>Chat with Facebook</span>
                </a>
                <a href="https://instagram.com/charterx" target="_blank" rel="noopener noreferrer" className="chat-widget-option">
                   <FaInstagram className="chat-icon" style={{ color: "#E1306C" }} />
                   <span>Chat with Instagram</span>
                </a>
             </div>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button 
          className="chat-widget-toggle" 
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <FaCommentDots />
        </button>
      )}
    </div>
  );
}
