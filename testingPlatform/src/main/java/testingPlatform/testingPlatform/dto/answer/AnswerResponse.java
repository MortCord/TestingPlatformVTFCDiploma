package testingPlatform.testingPlatform.dto.answer;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnswerResponse {
    private Long id;
    private String content;
    private boolean isCorrect;
    private String matchGroup;
}
