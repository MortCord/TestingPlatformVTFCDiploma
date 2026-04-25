package testingPlatform.testingPlatform.dto.result;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResultResponse {
    private Long id;
    private int score;
    private Long studentId;
    private Long testId;
}
