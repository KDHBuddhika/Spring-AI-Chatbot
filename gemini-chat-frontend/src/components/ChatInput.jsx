import React, { useState } from 'react';
import { FiSend, FiMic, FiPaperclip, FiSmile } from 'react-icons/fi';

const ChatInput = ({ onSubmit, darkMode }) => {
  const [question, setQuestion] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <button 
        type="button"
        className="p-2.5 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
        aria-label="Attach file"
      >
        <FiPaperclip className="w-5 h-5" />
      </button>
      
      <div className="flex-1 relative">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type your message..."
          className={`w-full border rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none transition-all duration-200 
            ${isFocused 
              ? 'border-primary/30 bg-white dark:bg-gray-800 shadow-sm' 
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
            }
            dark:text-white
          `}
          rows="1"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button 
          type="button"
          className="absolute right-3 bottom-3 p-1.5 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none"
          aria-label="Add emoji"
        >
          <FiSmile className="w-5 h-5" />
        </button>
      </div>
      
      <button 
        type="button"
        className="p-2.5 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
        aria-label="Voice input"
      >
        <FiMic className="w-5 h-5" />
      </button>
      
      <button 
        type="submit"
        className={`p-3.5 rounded-full focus:outline-none transition-all duration-200 ${
          question.trim() 
            ? 'bg-gradient-to-r from-primary to-indigo-500 dark:from-indigo-600 dark:to-purple-600 text-white hover:shadow-md' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        }`}
        disabled={!question.trim()}
        aria-label="Send message"
      >
        <FiSend className="w-5 h-5" />
      </button>
    </form>
  );
};

export default ChatInput;