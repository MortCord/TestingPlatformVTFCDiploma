package testingPlatform.testingPlatform.dto.answer;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CreateAnswerRequest {
    private String content;

    @JsonProperty("isCorrect")
    private Boolean isCorrect;
    private String matchGroup;
    private Long questionId;
}
