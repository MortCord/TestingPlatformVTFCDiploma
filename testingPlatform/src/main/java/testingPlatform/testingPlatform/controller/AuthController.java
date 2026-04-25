package testingPlatform.testingPlatform.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import testingPlatform.testingPlatform.dto.auth.LoginRequest;
import testingPlatform.testingPlatform.dto.auth.RegisterRequest;
import testingPlatform.testingPlatform.dto.user.UserResponse;
import testingPlatform.testingPlatform.model.User;
import testingPlatform.testingPlatform.service.AuthService;

@RestController
@RequestMapping("auth/")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){
        return authService.login(request);
    }

}
