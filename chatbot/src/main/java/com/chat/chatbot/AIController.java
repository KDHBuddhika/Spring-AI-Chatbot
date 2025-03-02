package com.chat.chatbot;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/qna")
public class AIController {

    @Autowired
    private QnAService qnAService;

    public ResponseEntity<String> askQuection (@RequestBody Map<String,String> payload){
         String quection = payload.get("quection");
         String answer = qnAService.getAnswer(quection);
         return ResponseEntity.ok(answer);
    }

}
