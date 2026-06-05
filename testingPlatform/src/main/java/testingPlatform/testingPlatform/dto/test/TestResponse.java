package testingPlatform.testingPlatform.dto.test;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TestResponse {
    private Long id;
    private String title;
    private String subject;
    private Long teacherId;
}
