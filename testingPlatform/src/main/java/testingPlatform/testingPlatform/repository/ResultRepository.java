package testingPlatform.testingPlatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import testingPlatform.testingPlatform.model.Result;
import testingPlatform.testingPlatform.model.User;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {

    List<Result> findByStudentId(Long studentId);

    List<Result> findByTestId(Long testId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Result r WHERE r.test.id = :testId")
    void deleteByTestId(Long testId);

}
