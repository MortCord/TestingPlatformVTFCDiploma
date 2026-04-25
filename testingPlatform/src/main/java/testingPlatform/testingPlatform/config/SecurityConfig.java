package testingPlatform.testingPlatform.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import testingPlatform.testingPlatform.security.JwtFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable()).
                authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/tests/teacher/**").hasAnyRole("TEACHER", "ADMIN")
                        .requestMatchers("/tests").hasAnyRole("STUDENT", "TEACHER", "ADMIN")
                        .requestMatchers("/questions/test/**").hasAnyRole("STUDENT", "TEACHER", "ADMIN")
                        .requestMatchers("/questions/**").hasAnyRole("TEACHER", "ADMIN")
                        .requestMatchers("/answers/**").hasAnyRole("TEACHER", "ADMIN")
                        .requestMatchers("/results/submit").hasRole("STUDENT")
                        .requestMatchers("/results/student/**").hasRole("STUDENT")
                        .requestMatchers("/users/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }

}
