package testingPlatform.testingPlatform.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import testingPlatform.testingPlatform.dto.test.CreateTestRequest;
import testingPlatform.testingPlatform.dto.test.TestResponse;
import testingPlatform.testingPlatform.model.Test;
import testingPlatform.testingPlatform.model.User;
import testingPlatform.testingPlatform.repository.TestRepository;
import testingPlatform.testingPlatform.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestRepository testRepository;
    private final UserRepository userRepository;

    public TestResponse createTest(CreateTestRequest request){
        User teacher = userRepository.findById(request.getTeacherId()).orElseThrow(() -> new RuntimeException("Teacher not found"));
        Test test = Test.builder().title(request.getTitle()).createdBy(teacher).build();
        Test saved = testRepository.save(test);

        return TestResponse.builder().id(saved.getId()).title(saved.getTitle()).teacherId(saved.getCreatedBy().getId()).build();
    }

    public List<Test> getAllTests(){
        return testRepository.findAll();
    }

    public List<Test> getByTeacher(Long teacherId){
        return testRepository.findByCreatedById(teacherId);
    }



}
