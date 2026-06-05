package testingPlatform.testingPlatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import testingPlatform.testingPlatform.model.Test;
import testingPlatform.testingPlatform.model.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TestRepository extends JpaRepository<Test, Long> {

    List<Test> findByCreatedById(Long teacherId);

    @Transactional
    void deleteByCreatedById(Long teacherId);

    List<Test> findBySubject(String subject);

    List<Test> findByVisibility(String visibility);

    Optional<Test> findByAccessCode(String accessCode);

    List<Test> findByCodeExpiresAtAfter(LocalDateTime dateTime);

}
