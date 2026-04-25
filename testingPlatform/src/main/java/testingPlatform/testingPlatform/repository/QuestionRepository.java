package testingPlatform.testingPlatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import testingPlatform.testingPlatform.model.Question;
import testingPlatform.testingPlatform.model.User;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByTestId(Long testId);

}
