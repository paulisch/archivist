/*
 * Archivist 2017
 * MusicPieceRepository.java
 */
package at.fhhgb.mc.archivist.repository;

import org.springframework.data.repository.CrudRepository;

import at.fhhgb.mc.archivist.model.Musicpiece;

/**
 * The Interface MusicPieceRepository for managing musicpiece-entries in the database.
 * Spring framework will implement a functioning class automatically in the background.
 */
public interface MusicPieceRepository extends CrudRepository<Musicpiece, Integer> {

}