package kr.megabrain.sirenorderserver.config;


import kr.megabrain.sirenorderserver.service.CustomUserDetailsService;
import kr.megabrain.sirenorderserver.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.formLogin()
                // 로그인 설정
                .defaultSuccessUrl("/order")
                .usernameParameter("username")
                .failureUrl("/login/error")
                .and()
                // 로그아웃 설정
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/");

        http.authorizeRequests() // httpServletRequest 사용
                .mvcMatchers("/ping", "/signup", "/login").permitAll() // 해당 경로들은 비인증으로 접근 허용
                .anyRequest().authenticated();  // 나머지 경로들은 모두 인증 요구
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // 인증
        auth.userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder());    // 비밀번호 암호화
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
