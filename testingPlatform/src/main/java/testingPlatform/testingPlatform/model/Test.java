package testingPlatform.testingPlatform.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String subject;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User createdBy;

    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private List<Question> questions;

    private String visibility;

    private String accessCode;

    private LocalDateTime codeExpiresAt;
}
