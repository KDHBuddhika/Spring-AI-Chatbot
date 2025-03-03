import { useState } from 'react'
import './App.css'
import ChatInput from './components/ChatInput'
import ChatResponse from './components/ChatResponce'
import { fetchChatResponse } from './service/api'



function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit  =async (question) => {
    setLoading(true);
    setResponse(null);
    try{
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse)
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
      {loading && <h3>Loading........</h3>}
      <ChatResponse response={response}/>
      
    </div>
  )
}

export default App
