package testingPlatform.testingPlatform.service;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import testingPlatform.testingPlatform.dto.auth.LoginRequest;
import testingPlatform.testingPlatform.dto.auth.RegisterRequest;
import testingPlatform.testingPlatform.dto.user.UserResponse;
import testingPlatform.testingPlatform.model.Role;
import testingPlatform.testingPlatform.model.User;
import testingPlatform.testingPlatform.repository.UserRepository;
import testingPlatform.testingPlatform.security.JwtService;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(RegisterRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .build();

        userRepository.save(user);

        return jwtService.generateToken(user);
    }

    public String login(LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Wrong password");
        }

        return jwtService.generateToken(user);
    }

}
