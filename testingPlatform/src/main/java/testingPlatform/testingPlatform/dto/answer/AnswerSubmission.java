package testingPlatform.testingPlatform.dto.answer;

import lombok.Data;

import java.util.List;

@Data
public class AnswerSubmission {

    private Long questionId;
    private List<Long> selectedAnswerIds;
    private String textAnswer;

}
