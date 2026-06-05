package testingPlatform.testingPlatform.dto.test;


import lombok.Data;

@Data
public class CreateTestRequest {
    private String title;
    private String subject;
    private Long teacherId;
    private String visibility;
    private Integer codeLifetimeMinutes;
}
