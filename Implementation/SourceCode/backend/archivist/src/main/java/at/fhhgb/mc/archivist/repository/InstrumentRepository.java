/*
 * Archivist 2017
 * InstrumentRepository.java
 */
package at.fhhgb.mc.archivist.repository;

import org.springframework.data.repository.CrudRepository;

import at.fhhgb.mc.archivist.model.Instrument;

/**
 * The Interface InstrumentRepository for managing instrument-entries in the database.
 * Spring framework will implement a functioning class automatically in the background.
 */
public interface InstrumentRepository extends CrudRepository<Instrument, Integer> { }