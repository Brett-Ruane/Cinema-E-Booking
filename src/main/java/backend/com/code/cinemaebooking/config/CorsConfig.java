// package backend.com.code.cinemaebooking.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// @Configuration
// public class CorsConfig {

// @Bean
// public CorsFilter corsFilter() {
// UrlBasedCorsConfigurationSource source = new
// UrlBasedCorsConfigurationSource();
// CorsConfiguration config = new CorsConfiguration();
// config.setAllowCredentials(true);
// config.addAllowedOrigin("http://localhost:3000"); // Replace with your
// frontend's origin
// config.addAllowedHeader("*");
// config.addAllowedMethod("*");
// source.registerCorsConfiguration("/**", config);
// return new CorsFilter((CorsConfigurationSource) source);
// }
// }
