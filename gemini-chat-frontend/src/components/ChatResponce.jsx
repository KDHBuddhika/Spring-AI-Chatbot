const ChatResponse = ( {response}) =>{
    if(!response){
        return null;
    }


    return(
        <div className="container my-4">
            <h3>Response</h3>
        </div>
    )
}

export default ChatResponse;