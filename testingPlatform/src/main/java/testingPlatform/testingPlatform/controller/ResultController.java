package testingPlatform.testingPlatform.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import testingPlatform.testingPlatform.dto.result.ResultResponse;
import testingPlatform.testingPlatform.dto.test.SubmitTestRequest;
import testingPlatform.testingPlatform.model.Result;
import testingPlatform.testingPlatform.service.ResultService;

import java.util.List;

@RestController
@RequestMapping("/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @PostMapping
    public ResultResponse save(@RequestParam Long studentId, @RequestParam Long testId, @RequestParam int score){

        return resultService.saveResult(studentId,testId,score);

    }

    @GetMapping("/student/{studentId}")
    public List<Result> getStudentResults(@PathVariable Long studentId){
        return resultService.getStudentResults(studentId);
    }

    @GetMapping("/test/{testId}")
    public List<Result> getByTest(@PathVariable Long testId){
        return resultService.getResultsByTest(testId);
    }

    @PostMapping("/submit")
    public ResultResponse submit(@RequestBody SubmitTestRequest request){
        return resultService.submitTest(request);
    }

}
