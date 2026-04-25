package testingPlatform.testingPlatform.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import testingPlatform.testingPlatform.dto.answer.AnswerResponse;
import testingPlatform.testingPlatform.dto.answer.CreateAnswerRequest;
import testingPlatform.testingPlatform.model.Answer;
import testingPlatform.testingPlatform.service.AnswerService;

import java.util.List;

@RestController
@RequestMapping("/answers")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;


    @PostMapping
    public AnswerResponse create(@RequestBody CreateAnswerRequest request){
        return answerService.createAnswer(request);
    }

    @GetMapping("/question/{questionId}")
    public List<Answer> getByQuestion(@PathVariable Long questionId){
        return answerService.getByQuestion(questionId);
    }

}
