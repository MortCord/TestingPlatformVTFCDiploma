package testingPlatform.testingPlatform.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import testingPlatform.testingPlatform.dto.question.CreateQuestionRequest;
import testingPlatform.testingPlatform.dto.question.QuestionResponse;
import testingPlatform.testingPlatform.model.Question;
import testingPlatform.testingPlatform.model.QuestionType;
import testingPlatform.testingPlatform.model.Test;
import testingPlatform.testingPlatform.repository.QuestionRepository;
import testingPlatform.testingPlatform.repository.TestRepository;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final TestRepository testRepository;

    public QuestionResponse createQuestion(String content, QuestionType type, Long testId, MultipartFile image) {

        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));

        String imageUrl = null;

        if (image != null && !image.isEmpty()) {
            try {
                String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
                Path path = Paths.get("uploads/" + fileName);

                Files.createDirectories(path.getParent());
                Files.write(path, image.getBytes());

                imageUrl = "/uploads/" + fileName;

            } catch (Exception e) {
                throw new RuntimeException("Image upload failed: " + e.getMessage());
            }
        }

        Question question = Question.builder()
                .content(content)
                .type(type)
                .test(test)
                .imageUrl(imageUrl)
                .build();

        Question saved = questionRepository.save(question);

        return QuestionResponse.builder()
                .id(saved.getId())
                .content(saved.getContent())
                .type(saved.getType())
                .imageUrl(saved.getImageUrl())
                .build();
    }

    public List<Question> getByTest(Long testId){
        return questionRepository.findByTestId(testId);
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

}
