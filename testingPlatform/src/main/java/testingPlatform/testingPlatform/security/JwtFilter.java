package testingPlatform.testingPlatform.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        System.out.println("AUTH HEADER: " + header);

        if(header == null || !header.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
        System.out.println("TOKEN: " + token);
        try {
            String email;

            try {
                email = jwtService.extractEmail(token);
                System.out.println("EMAIL: " + email);
            } catch (Exception e) {
                e.printStackTrace();
                filterChain.doFilter(request, response);
                return;
            }

            if(email != null && SecurityContextHolder.getContext().getAuthentication() == null){
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                System.out.println("AUTHORITIES: " + userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
                System.out.println("AUTH SET: " + auth);
            }

        } catch (Exception e) {

        }
        System.out.println("FINAL AUTH: " + SecurityContextHolder.getContext().getAuthentication());
        filterChain.doFilter(request, response);
    }

}
