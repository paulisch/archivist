/*
 * Archivist 2017
 * ArchivistApplication.java
 */
package at.fhhgb.mc.archivist;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import at.fhhgb.mc.archivist.storage.StorageProperties;
import at.fhhgb.mc.archivist.storage.StorageService;

/**
 * The class ArchivistApplication represents the main entry
 * point of the backend application and sets some basic configuration.
 */
@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class ArchivistApplication extends SpringBootServletInitializer {

	/**
	 * The main entry point for starting the server application.
	 *
	 * @param args (unused)
	 */
	public static void main(String[] args) {
		SpringApplication.run(ArchivistApplication.class, args);
	}
	
	/**
	 * Configures the Servlet for the application.
	 *
	 * @param application the spring application builder
	 * @return the spring application builder
	 * @see SpringApplicationBuilder
	 */
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ArchivistApplication.class);
	}
	
	/**
	 * Inits the storage services for the purpose of storing files later on.
	 *
	 * @param storageService the storage service
	 * @return the command line runner
	 */
	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args) -> {
            storageService.init();
		};
	}
}
