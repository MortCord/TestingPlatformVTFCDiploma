package testingPlatform.testingPlatform.dto.question;


import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import testingPlatform.testingPlatform.model.QuestionType;

@Data
@Builder
public class QuestionResponse {
    private Long id;
    private String content;
    private QuestionType type;
    private String imageUrl;
    private MultipartFile image;
}
