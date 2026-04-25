package testingPlatform.testingPlatform.dto.test;

import lombok.Data;
import testingPlatform.testingPlatform.dto.answer.AnswerSubmission;

import java.util.List;

@Data
public class SubmitTestRequest {
    private Long testId;
    private Long studentId;
    private List<AnswerSubmission> answers;

}
