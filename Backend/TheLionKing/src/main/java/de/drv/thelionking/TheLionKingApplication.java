package de.drv.thelionking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class TheLionKingApplication {

	public static void main(String[] args) {
		SpringApplication.run(TheLionKingApplication.class, args);
	}

}
