/*
 * Archivist 2017
 * GenreController.java
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

import at.fhhgb.mc.archivist.model.Genre;
import at.fhhgb.mc.archivist.repository.GenreRepository;

/**
 * The class GenreController makes genre-entries accessible.
 * URL: /archivist/api/genres
 */
@RestController
@RequestMapping("/${api.path}/genres")
@CrossOrigin(origins = "http://localhost:8000") //for testing purposes with frontend running on port 8000
public class GenreController {

	/** The genre repository. */
	@Autowired
	private GenreRepository repository;
	
	/**
	 * Gets a list of genres stored in the database.
	 *
	 * @return the list of genres
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/get")
	public Collection<Genre> get() {
		Collection<Genre> result = new LinkedList<Genre>();
		
		Iterator<Genre> it = repository.findAll().iterator();
		while(it.hasNext()) {
			Genre current = it.next();
			prepareForSerialization(current);			
			result.add(current);
		}
		return result;
	}

	/**
	 * Prepare a genre object for serialization.
	 * Sets certain properties to null to avoid reference loops and allow trouble-free serialization.
	 *
	 * @param current the current genre object for serialization
	 */
	private void prepareForSerialization(Genre current) {
		current.setMusicpieces(null);
		current.setGenres(null);
		if (current.getGenre() != null) {
			Genre g = new Genre();
			g.setGenreId(current.getGenre().getGenreId());
			current.setGenre(g);
		}
	}
}