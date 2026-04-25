package testingPlatform.testingPlatform.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import testingPlatform.testingPlatform.dto.answer.AnswerResponse;
import testingPlatform.testingPlatform.dto.answer.CreateAnswerRequest;
import testingPlatform.testingPlatform.model.Answer;
import testingPlatform.testingPlatform.model.Question;
import testingPlatform.testingPlatform.repository.AnswerRepository;
import testingPlatform.testingPlatform.repository.QuestionRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    public AnswerResponse createAnswer(CreateAnswerRequest request){

        Question question = questionRepository.findById(request.getQuestionId()).orElseThrow(() -> new RuntimeException("Question not found"));

        Answer answer = Answer.builder().content(request.getContent()).isCorrect(request.getIsCorrect()).matchGroup(request.getMatchGroup()).question(question).build();
        System.out.println("DEBUG isCorrect = " + request.getIsCorrect());
        Answer saved = answerRepository.save(answer);

        System.out.println("ENTITY isCorrect = " + answer.isCorrect());
        return AnswerResponse.builder().id(saved.getId()).content(saved.getContent()).isCorrect(saved.isCorrect()).matchGroup(saved.getMatchGroup()).build();



    }

    public List<Answer> getByQuestion(Long questionId){
        return answerRepository.findByQuestionId(questionId);
    }

}
