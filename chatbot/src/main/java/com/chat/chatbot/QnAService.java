package com.chat.chatbot;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class QnAService {

   // Access to api key and URL[Gemini]
    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;



    public String getAnswer(String quection) {
        // Construct the request payload
        Map<String , Object> requestBody = Map.of(
                "contents" , new Object[] {
                        Map.of("parts" , new Object[]{
                               Map.of("text",quection)
                        } )
                }
        );

        //{
        //  "contents": [{
        //    "parts":[{"text": "Explain how AI works"}]
        //    }]
        //   }


        //Make API Call


        //Return response


        return null;
    }
}
