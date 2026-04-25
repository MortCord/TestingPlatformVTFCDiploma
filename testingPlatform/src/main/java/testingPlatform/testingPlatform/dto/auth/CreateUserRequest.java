package testingPlatform.testingPlatform.dto.auth;

import lombok.Data;
import testingPlatform.testingPlatform.model.Role;

@Data
public class CreateUserRequest {
    private String email;
    private String password;
    private Role role;
}
