package testingPlatform.testingPlatform.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import testingPlatform.testingPlatform.dto.question.CreateQuestionRequest;
import testingPlatform.testingPlatform.dto.question.QuestionResponse;
import testingPlatform.testingPlatform.model.Question;
import testingPlatform.testingPlatform.service.QuestionService;

import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public QuestionResponse create(@RequestBody CreateQuestionRequest request){
        return questionService.createQuestion(request);
    }

    @GetMapping("/test/{testId}")
    public List<Question> getByTest(@PathVariable Long testId){
        return questionService.getByTest(testId);
    }

}
