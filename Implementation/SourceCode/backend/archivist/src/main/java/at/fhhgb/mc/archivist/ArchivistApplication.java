package at.fhhgb.mc.archivist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class ArchivistApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(ArchivistApplication.class, args);
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ArchivistApplication.class);
	}
}
