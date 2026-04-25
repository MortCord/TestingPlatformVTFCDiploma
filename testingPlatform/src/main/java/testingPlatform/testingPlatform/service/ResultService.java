package testingPlatform.testingPlatform.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import testingPlatform.testingPlatform.dto.answer.AnswerSubmission;
import testingPlatform.testingPlatform.dto.result.ResultResponse;
import testingPlatform.testingPlatform.dto.test.SubmitTestRequest;
import testingPlatform.testingPlatform.model.*;
import testingPlatform.testingPlatform.repository.QuestionRepository;
import testingPlatform.testingPlatform.repository.ResultRepository;
import testingPlatform.testingPlatform.repository.TestRepository;
import testingPlatform.testingPlatform.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultService {

    private final ResultRepository resultRepository;
    private final UserRepository userRepository;
    private final TestRepository testRepository;
    private final QuestionRepository questionRepository;

    public ResultResponse saveResult(Long studentId, Long testId, int score){

        User student = userRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        Test test = testRepository.findById(testId).orElseThrow(() -> new RuntimeException("Test not found"));
        Result result = Result.builder().student(student).test(test).score(score).build();
        Result saved = resultRepository.save(result);

        return ResultResponse.builder().id(saved.getId()).studentId(student.getId()).testId(test.getId()).score(saved.getScore()).build();
    }

    public List<Result> getStudentResults(Long studentId){
        return resultRepository.findByStudentId(studentId);
    }

    public ResultResponse submitTest(SubmitTestRequest request){

        List<Question> questions = questionRepository.findByTestId(request.getTestId());
        int score = 0;

        for(Question q : questions){
            AnswerSubmission sub = request.getAnswers().stream().filter(a -> a.getQuestionId().equals(q.getId())).
                    findFirst().orElse(null);

            if(sub == null){
                continue;
            }

            switch (q.getType()){
                case SINGLE_CHOICE:
                    Answer correctAnswer = q.getAnswers().stream()
                            .filter(Answer::isCorrect)
                            .findFirst()
                            .orElseThrow(() -> new RuntimeException("No correct answer for question " + q.getId()));

                    Long correctId = correctAnswer.getId();

                    if(sub.getSelectedAnswerIds().contains(correctId)){
                        score++;
                    }
                    break;
                case MULTIPLE_CHOICES:
                    List<Long> correct = q.getAnswers().stream().filter(Answer::isCorrect).map(Answer::getId).toList();

                    if(correct.equals(sub.getSelectedAnswerIds())){
                        score++;
                    }
                    break;
                case OPEN_ANSWER:
                    if(q.getCorrectTextAnswer().equalsIgnoreCase(sub.getTextAnswer())){
                        score++;
                    }
                    break;
                case MATCHING:
                    //todo
                    break;
            }
        }

        return saveResult(request.getStudentId(), request.getTestId(), score);



    }

}
