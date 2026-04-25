package testingPlatform.testingPlatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import testingPlatform.testingPlatform.model.Test;
import testingPlatform.testingPlatform.model.User;

import java.util.List;

public interface TestRepository extends JpaRepository<Test, Long> {

    List<Test> findByCreatedById(Long teacherId);

}
