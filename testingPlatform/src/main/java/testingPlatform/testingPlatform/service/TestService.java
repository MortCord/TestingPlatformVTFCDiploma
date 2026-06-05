package testingPlatform.testingPlatform.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import testingPlatform.testingPlatform.dto.test.CreateTestRequest;
import testingPlatform.testingPlatform.dto.test.TestResponse;
import testingPlatform.testingPlatform.model.Test;
import testingPlatform.testingPlatform.model.User;
import testingPlatform.testingPlatform.repository.ResultRepository;
import testingPlatform.testingPlatform.repository.TestRepository;
import testingPlatform.testingPlatform.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestRepository testRepository;
    private final UserRepository userRepository;
    private final ResultRepository resultRepository;

    public TestResponse createTest(CreateTestRequest request){

        User teacher = userRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Test.TestBuilder builder = Test.builder()
                .title(request.getTitle())
                .subject(request.getSubject())
                .visibility(request.getVisibility())
                .createdBy(teacher);

        if("PRIVATE".equals(request.getVisibility())){

            builder.accessCode(generateCode());

            builder.codeExpiresAt(
                    LocalDateTime.now()
                            .plusMinutes(request.getCodeLifetimeMinutes())
            );
        }

        Test saved = testRepository.save(builder.build());

        return TestResponse.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .subject(saved.getSubject())
                .teacherId(saved.getCreatedBy().getId())
                .build();
    }

    public List<Test> getAllTests(){
        return testRepository.findAll();
    }

    public List<Test> getByTeacher(Long teacherId){
        return testRepository.findByCreatedById(teacherId);
    }

    public List<Test> getBySubject(String subject){
        return testRepository.findBySubject(subject);
    }

    public void deleteTest(Long id){

        resultRepository.deleteByTestId(id);

        testRepository.deleteById(id);
    }

    private String generateCode() {
        return UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();
    }

    public List<Test> getPublicTests(){
        return testRepository.findByVisibility("PUBLIC");
    }

    public Test joinByCode(String code){

        Test test = testRepository.findByAccessCode(code)
                .orElseThrow(() ->
                        new RuntimeException("Invalid code"));

        if(test.getCodeExpiresAt().isBefore(LocalDateTime.now())){
            throw new RuntimeException("Code expired");
        }

        return test;
    }
}