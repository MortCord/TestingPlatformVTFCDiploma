package testingPlatform.testingPlatform.dto.question;


import lombok.Data;
import testingPlatform.testingPlatform.model.QuestionType;

@Data
public class CreateQuestionRequest {
    private String content;
    private QuestionType type;
    private Long testId;
    private String correctAnswer;
}
