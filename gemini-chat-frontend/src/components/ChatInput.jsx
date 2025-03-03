import { useState } from "react"

const ChatInput = ({onSubmit}) =>{
  
    const [question , setQuestion] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (question.trim()){
            onSubmit(question);
            setQuestion("");
        }

    }

    return(
       <div className="container my-4">
             <form onSubmit={handleSubmit}>
                <div className="form-group">
                 <label htmlFor="question">Ask a Question </label>
                 <input 
                      type="text"
                      className="form-control"
                      id="question"
                      placeholder="Enter Your question" 
                      value={question}
                      onChange={(e) => setQuestion(e.target.value) }/>
             </div>
             <button type="submit" className="btn btn-primary mt-2">
                  Submit
             </button>
           </form>
       </div>       
    )       
}

export default ChatInput;