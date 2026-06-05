package testingPlatform.testingPlatform.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import testingPlatform.testingPlatform.dto.auth.CreateUserRequest;
import testingPlatform.testingPlatform.model.User;
import testingPlatform.testingPlatform.repository.UserRepository;
import testingPlatform.testingPlatform.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping
    public List<User> getAll(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id){
        return userService.getById(id);
    }

    @PostMapping
    public User create(@RequestBody CreateUserRequest request){
        return userService.createUser(
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        userService.deleteUser(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody CreateUserRequest request) {
        return userService.updateUser(id, request);
    }

}
