package testingPlatform.testingPlatform.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import testingPlatform.testingPlatform.dto.question.CreateQuestionRequest;
import testingPlatform.testingPlatform.dto.question.QuestionResponse;
import testingPlatform.testingPlatform.model.Question;
import testingPlatform.testingPlatform.model.Test;
import testingPlatform.testingPlatform.repository.QuestionRepository;
import testingPlatform.testingPlatform.repository.TestRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final TestRepository testRepository;

    public QuestionResponse createQuestion(CreateQuestionRequest request){

        Test test = testRepository.findById(request.getTestId()).orElseThrow(() -> new RuntimeException("Test not found"));

        Question question = Question.builder().content(request.getContent()).type(request.getType()).correctTextAnswer(request.getCorrectAnswer())
                .test(test).build();

        Question saved = questionRepository.save(question);

        return QuestionResponse.builder().id(saved.getId()).content(saved.getContent()).type(saved.getType()).build();

    }

    public List<Question> getByTest(Long testId){
        return questionRepository.findByTestId(testId);
    }

}
