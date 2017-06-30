/*
 * Archivist 2017
 * GenreRepository.java
 */
package at.fhhgb.mc.archivist.repository;

import org.springframework.data.repository.CrudRepository;

import at.fhhgb.mc.archivist.model.Genre;

/**
 * The Interface GenreRepository for managing genre-entries in the database.
 * Spring framework will implement a functioning class automatically in the background.
 */
public interface GenreRepository extends CrudRepository<Genre, Integer> {}