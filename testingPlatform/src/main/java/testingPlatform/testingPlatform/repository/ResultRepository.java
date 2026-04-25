package testingPlatform.testingPlatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import testingPlatform.testingPlatform.model.Result;
import testingPlatform.testingPlatform.model.User;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {

    List<Result> findByStudentId(Long studentId);

    List<Result> findByTestId(Long testId);

}
