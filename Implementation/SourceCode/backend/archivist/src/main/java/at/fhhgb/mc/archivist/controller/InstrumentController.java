/*
 * Archivist 2017
 * InstrumentController.java
 */
package at.fhhgb.mc.archivist.controller;

import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import at.fhhgb.mc.archivist.model.Instrument;
import at.fhhgb.mc.archivist.repository.InstrumentRepository;

/**
 * The class InstrumentController makes instrument-entries accessible.
 * URL: /archivist/api/instruments
 */
@RestController
@RequestMapping("/${api.path}/instruments")
@CrossOrigin(origins = "http://localhost:8000") //for testing purposes with frontend running on port 8000
public class InstrumentController {

	/** The instrument repository. */
	@Autowired
	private InstrumentRepository repository;
	
	/**
	 * Gets a list of instruments stored in the database.
	 *
	 * @return the list of instruments
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/get")
	public Collection<Instrument> get() {
		Collection<Instrument> result = new LinkedList<Instrument>();
		
		Iterator<Instrument> it = repository.findAll().iterator();
		while(it.hasNext()) {
			Instrument current = it.next();
			prepareForSerialization(current);			
			result.add(current);
		}
		return result;
	}
	
	/**
	 * Prepare an instrument object for serialization.
	 * Sets certain properties to null to avoid reference loops and allow trouble-free serialization.
	 *
	 * @param current the current instrument object for serialization
	 */
	private void prepareForSerialization(Instrument instrument) {
		instrument.setScores(null);
	}
}
