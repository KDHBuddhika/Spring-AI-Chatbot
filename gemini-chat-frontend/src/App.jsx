import { useState } from 'react'
import './App.css'
import ChatInput from './components/ChatInput'
import ChatResponse from './components/ChatResponce'



function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit  =async (question) => {
    setLoading(true);
    setResponse(null);
    try{
      
    }catch(error)
    {
       alert("Failed to get responce")    
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className='App'>
      <header className='bg-primary text-white text-center p-4'>
         <h1>Gemini Chatbot</h1>
      </header>
      <ChatInput onSubmit={handleQuestionSubmit}/>
      <ChatResponse response={response}/>
      
    </div>
  )
}

export default App
