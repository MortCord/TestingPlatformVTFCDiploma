package testingPlatform.testingPlatform.dto.test;


import lombok.Data;

@Data
public class CreateTestRequest {
    private String title;
    private Long teacherId;
}
