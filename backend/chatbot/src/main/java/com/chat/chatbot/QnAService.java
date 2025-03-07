package com.chat.chatbot;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class QnAService {

   // Access to api key and URL[Gemini]
    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;


    private final WebClient webClient;

    public QnAService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }


    public String getAnswer(String quection) {
        // Construct the request payload
        Map<String , Object> requestBody = Map.of(
                "contents" , new Object[] {
                        Map.of("parts" , new Object[]{
                               Map.of("text",quection)
                        } )
                }
        );
  //------------ stucture ------------
        // {
        //  "contents": [{
        //    "parts":[{"text": "Explain how AI works"}]
        //    }]
        //   }
//-------------------------------------------

        //Make API Call

      String response =   webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();


        //Return response


        return response;
    }
}
