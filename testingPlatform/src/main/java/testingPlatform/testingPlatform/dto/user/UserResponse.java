package testingPlatform.testingPlatform.dto.user;


import lombok.Builder;
import lombok.Data;
import testingPlatform.testingPlatform.model.Role;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private Role role;
}
