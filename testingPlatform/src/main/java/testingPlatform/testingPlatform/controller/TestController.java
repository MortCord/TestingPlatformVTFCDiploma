package testingPlatform.testingPlatform.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import testingPlatform.testingPlatform.dto.test.CreateTestRequest;
import testingPlatform.testingPlatform.dto.test.TestResponse;
import testingPlatform.testingPlatform.model.Test;
import testingPlatform.testingPlatform.service.TestService;

import java.util.List;

@RestController
@RequestMapping("/tests")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @PostMapping
    public TestResponse createTest(@RequestBody CreateTestRequest request){
        return testService.createTest(request);
    }

    @GetMapping
    public List<Test> getAll(){
        return testService.getPublicTests();
    }

    @GetMapping("/teacher/{teacherId}")
    public List<Test> getByTeacher(@PathVariable Long teacherId){
        return testService.getByTeacher(teacherId);
    }

    @GetMapping("/subject/{subject}")
    public List<Test> getBySubject(@PathVariable String subject){
        return testService.getBySubject(subject);
    }

    @DeleteMapping("/{id}")
    public void deleteTest(@PathVariable Long id) {
        testService.deleteTest(id);
    }

    @PostMapping("/join")
    public Test joinByCode(@RequestParam String code){
        return testService.joinByCode(code);
    }



}
