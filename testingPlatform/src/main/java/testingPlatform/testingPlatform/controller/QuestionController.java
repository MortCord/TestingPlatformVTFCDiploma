package testingPlatform.testingPlatform.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import testingPlatform.testingPlatform.dto.question.QuestionResponse;
import testingPlatform.testingPlatform.model.Question;
import testingPlatform.testingPlatform.model.QuestionType;
import testingPlatform.testingPlatform.service.QuestionService;

import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public QuestionResponse create(
            @RequestParam String content,
            @RequestParam QuestionType type,
            @RequestParam Long testId,
            @RequestParam(required = false) MultipartFile image
    ) {
        return questionService.createQuestion(content, type, testId, image);
    }

    @GetMapping("/test/{testId}")
    public List<Question> getByTest(@PathVariable Long testId){
        return questionService.getByTest(testId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        questionService.deleteQuestion(id);
    }
}