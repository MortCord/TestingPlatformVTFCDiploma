package testingPlatform.testingPlatform.service;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import testingPlatform.testingPlatform.dto.auth.CreateUserRequest;
import testingPlatform.testingPlatform.model.Role;
import testingPlatform.testingPlatform.model.Test;
import testingPlatform.testingPlatform.model.User;
import testingPlatform.testingPlatform.repository.ResultRepository;
import testingPlatform.testingPlatform.repository.TestRepository;
import testingPlatform.testingPlatform.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TestRepository testRepository;
    private final ResultRepository resultRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User createUser(String email, String password, Role role){
        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(role)
                .build();

        return userRepository.save(user);
    }

    public User updateUser(Long id, CreateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEmail(request.getEmail());
        user.setRole(request.getRole());

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id){
        
        List<Test> tests = testRepository.findByCreatedById(id);

        for (Test t : tests) {
            resultRepository.deleteByTestId(t.getId());
        }

        testRepository.deleteByCreatedById(id);

        User user = userRepository.findById(id)
                .orElseThrow();

        userRepository.delete(user);
    }

}
