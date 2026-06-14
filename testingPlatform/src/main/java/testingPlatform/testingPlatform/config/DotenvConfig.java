//package testingPlatform.testingPlatform.config;
//
//import io.github.cdimascio.dotenv.Dotenv;
//import jakarta.annotation.PostConstruct;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class DotenvConfig {
//
//    @PostConstruct
//    public void loadEnv(){
//        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
//
//        System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));
//    }
//
//}
