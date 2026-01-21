package de.drv.thelionking.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.http.HttpStatusCode;

@Configuration
@EnableConfigurationProperties({DoclingProperties.class, LlmProperties.class, PromptProperties.class})
public class ExternalConfig {
    @Bean
    public RestTemplate restTemplate() {
        RestTemplate rt = new RestTemplate();
        // Do not throw on non-2xx; let callers inspect status/body and handle
        rt.setErrorHandler(new DefaultResponseErrorHandler() {
            @Override
            public boolean hasError(HttpStatusCode statusCode) {
                return false;
            }
        });
        return rt;
    }
}
