package testingPlatform.testingPlatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import testingPlatform.testingPlatform.model.Answer;
import testingPlatform.testingPlatform.model.User;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

    List<Answer> findByQuestionId(Long questionId);

}
