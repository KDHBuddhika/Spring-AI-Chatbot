import React, { useState,useEffect } from 'react';
import ChatInput from './components/ChatInput';
import ChatResponse from './components/ChatResponse';
import { fetchChatResponse } from './service/api';
import { FiSettings, FiInfo, FiX, FiMoon, FiSun } from 'react-icons/fi';

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode based on user preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setResponse(null);
    try {
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      alert("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="glass-effect sticky top-0 z-10 shadow-sm py-4 px-6 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800/90">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-indigo-400 dark:from-indigo-600 dark:to-purple-500 flex items-center justify-center shadow-md">
              <span className="text-white text-xl font-bold">AI</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark dark:text-white">Gemini Chatbot</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Powered by AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full pulse"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Online</span>
            </div>
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <FiInfo className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <FiSettings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Info Panel */}
      {showInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <FiX className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">About Gemini Chatbot</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This is a modern UI chatbot built with React and Tailwind CSS. It features a clean, 
              responsive design with smooth animations and a user-friendly interface.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This chatbot connects to the Gemini API to provide intelligent responses.
            </p>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Version 1.0.0</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          {/* Loading Indicator */}
          {loading && <h3 className="text-center text-gray-600 dark:text-gray-300">Loading........</h3>}
          
          {/* Chat Response */}
          <ChatResponse response={response} darkMode={darkMode} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-md">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSubmit={handleQuestionSubmit} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default App;